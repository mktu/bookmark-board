import * as functions from 'firebase-functions';
import * as crypto from 'crypto';
import * as line from '@line/bot-sdk';
import querystring from 'querystring'
import { getFirestore } from 'firebase-admin/firestore';
import app from './admin'
import { extractUrl } from './extractUrl'
import scrape from './scrape'
import { bookmarkMessage, groupMessage, EventTypes, defaultGroupMessage } from './lineMessage'
import { BookmarkGroup, Bookmark, Profile } from './types'

type ProfileWithId = Profile & { id: string }
type BookmarkGroupWithId = BookmarkGroup & { id: string }

const firestore = getFirestore(app)
const SelectGroup = '#登録先グループ'

class LineLogicError extends Error {
	constructor(e?: string) {
		super(e);
		this.name = new.target.name;

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

const loadProfile: (userId: string | undefined) => Promise<ProfileWithId> = async (userId) => {
	const { docs: profileDocs } = await firestore
		.collection('profiles')
		.where('lineid', '==', userId)
		.get()
	if (profileDocs.length === 0) {
		throw new LineLogicError('Bookmark-Boradユーザが認識できませんでした')
	}

	const profile = profileDocs[0].data() as Profile
	const { lineInfo } = profile

	if (!lineInfo) {
		throw new LineLogicError('Line連携ができていません')
	}

	return {
		...profile,
		id: profileDocs[0].id
	}
}

const loadGroups: (profileId: string) => Promise<BookmarkGroupWithId[]> = async (profileId) => {
	const { docs: groupDocs } = await firestore
		.collection('groups')
		.where('owner', '==', profileId)
		.get()

	if (groupDocs.length === 0) {
		throw new LineLogicError('グループが存在しません')
	}
	const groups = groupDocs.filter(v => v.exists).map(v => ({
		...v.data() as BookmarkGroup,
		id: v.id
	}))
	return groups
}

const loadGroup: (groupId: string) => Promise<BookmarkGroup> = async (groupId) => {
	const groupDoc = await firestore
		.collection('groups')
		.doc(groupId)
		.get()
	if (!groupDoc.exists) {
		throw new LineLogicError('不正なグループです')
	}
	return groupDoc.data() as BookmarkGroup
}

const saveLineInfo = async (profileId: string, lineInfo: Profile['lineInfo']) => {
	const profileDoc = firestore
		.collection('profiles')
		.doc(profileId)

	await profileDoc.update({
		lineInfo
	})
}

const saveBookmark = async (groupId: string, {
	image = '',
	images = [],
	title,
	description = '',
	url,
	owner,
	unacquired = false,
}: Pick<Bookmark, 'url' | 'description' | 'title' | 'images' | 'image' | 'unacquired' | 'owner'>) => {
	const time = Date.now()
	const result = await firestore
		.collection('groups')
		.doc(groupId)
		.collection('bookmarks')
		.add({
			image,
			images,
			title,
			url,
			description,
			unacquired,
			owner,
			neighbors: [],
			reactions: {},
			groupId,
			created: time,
			idx: time
		} as Bookmark)

	return result.id
}

const checkRegistration = async (events: line.FollowEvent, client: line.Client) => {
	try {
		const profile = await loadProfile(events.source.userId)
		if (!profile.lineInfo?.defaultGroup) {
			const defaultGroupPage = `${functions.config().linebot.liffroot}/groups`
			await client.replyMessage(events.replyToken, [{
				type: 'text',
				text: '💡 毎回グループを選択しなくて済むように、登録先グループを設定することをお勧めします'
			},
			{
				type: 'flex',
				altText: "グループを選択してください",
				contents: defaultGroupMessage(defaultGroupPage)
			} as line.FlexMessage])
		}
	} catch (e) {
		await client.replyMessage(events.replyToken, [{
			type: 'text',
			text: `Bookmark-Boardの連携が行われていません。このBotを有効にするにはWEBブラウザからBookmark-BoardのLINE連携を行ってください。`
		}, {
			type: 'text',
			text: functions.config().hosting.siteurl
		}])
	}
}

const checkDupplicate = async (groupId: string, url: string) => {
	const docs = await firestore
		.collection('groups')
		.doc(groupId)
		.collection('bookmarks')
		.where('url', '==', url)
		.get()
	const dupplicates = []
	docs.forEach(v => {
		if (v.exists) {
			dupplicates.push(v)
		}
	})
	return dupplicates.length > 0
}

const scrapeNoThrow = async (url: string) => {
	try {
		return await scrape(url, true)
	} catch (e) {
		console.error(e)
		return null
	}
}

const registBookmark = async (url: string, groupId: string, owner: string) => {
	const isDupplicate = await checkDupplicate(groupId, url)
	if (isDupplicate) {
		throw new LineLogicError('すでに登録済みのブックマークです')
	}
	const scrapePromise = scrapeNoThrow(url)
	const loadPromise = loadGroup(groupId)
	const [result, group] = await Promise.all([scrapePromise, loadPromise])
	const { name } = group
	if (!result) {
		const bookmarkId = await saveBookmark(groupId, { url, title: url, owner })
		return {
			title: url,
			description: undefined,
			image: undefined,
			groupName: name,
			bookmarkId
		}
	}
	const { title, description, images } = result
	const bookmarkId = await saveBookmark(groupId, {
		title,
		url,
		description,
		image: images.length > 0 ? images[0] : '',
		images,
		owner
	})
	return {
		title,
		description,
		image: images.length > 0 ? images[0] : undefined,
		groupName: name,
		bookmarkId
	}
}

const handleRegisterBookmark: (events: line.PostbackEvent | line.MessageEvent, client: line.Client, url: string, groupId: string, owner: string) => Promise<void> = async (events, client, url, groupId, owner) => {
	await client.replyMessage(events.replyToken, {
		type: 'text',
		text: 'ブックマークの登録中です。しばらくお待ち下さい'
	})
	const { title, description, image, groupName, bookmarkId } = await registBookmark(url, groupId, owner)
	const liffroot = functions.config().linebot.liffroot
	const q = querystring.stringify({
		target: url
	})
	const editLink = `${liffroot}/bookmarks/${groupId}/${bookmarkId}?${q}`
	await client.pushMessage(events.source.userId || '', [{
		type: "flex",
		altText: "ブックマークの登録が完了しました",
		contents: bookmarkMessage({
			url,
			title: title || url,
			description,
			group: groupName,
			image,
			editLink
		})
	} as line.Message, {
		type: 'text',
		text: 'ブックマークの登録が完了しました 🎉'
	},])
}

const handleRegisterDefaultGroup: (events: line.PostbackEvent, client: line.Client, groupId: string) => Promise<void> = async (events, client, groupId) => {
	const { name } = await loadGroup(groupId)
	const { id, lineInfo } = await loadProfile(events.source.userId)
	const newLineInfo = {
		...lineInfo,
		defaultGroup: groupId
	} as typeof lineInfo
	await saveLineInfo(id, newLineInfo)
	await client.replyMessage(events.replyToken, {
		type: 'text',
		text: `登録先グループを[${name}]に設定しました`
	})
}
const handleUnregisterDefaultGroup: (events: line.PostbackEvent, client: line.Client) => Promise<void> = async (events, client) => {
	const { id, lineInfo } = await loadProfile(events.source.userId)
	const newLineInfo = {
		...lineInfo,
		defaultGroup: ''
	} as typeof lineInfo
	await saveLineInfo(id, newLineInfo)
	await client.replyMessage(events.replyToken, {
		type: 'text',
		text: `登録先グループを解除しました`
	})
}

const showGroupsBeforeRegisterBookmark: (events: line.MessageEvent, client: line.Client, url: string, profileId: string) => Promise<void> = async (events, client, url, profileId) => {
	const groups = await loadGroups(profileId)
	await client.replyMessage(events.replyToken, {
		type: 'flex',
		altText: "グループを選択してください",
		contents: groupMessage(groups.map(v => ({
			id: v.id, label: v.name
		})), url, profileId)
	} as line.FlexMessage)
}

const handleBookmark: (events: line.MessageEvent, client: line.Client) => Promise<void> = async (events, client) => {
	const { text } = events.message as line.TextEventMessage
	const url = extractUrl(text)
	if (!url) {
		throw new LineLogicError('無効なアドレスです')
	}
	const { id, lineInfo } = await loadProfile(events.source.userId)
	if (lineInfo?.defaultGroup) {
		await handleRegisterBookmark(events, client, url, lineInfo.defaultGroup, id)
	} else {
		await showGroupsBeforeRegisterBookmark(events, client, url, id)
	}
}

const handleMessage: (events: line.MessageEvent, client: line.Client) => Promise<void> = async (events, client) => {
	const { type: messageType } = events.message
	if (messageType !== 'text') {
		await client.replyMessage(events.replyToken, {
			type: 'text',
			text: '未実装の機能です'
		})
	}
	const { text } = events.message as line.TextEventMessage
	if (text.includes(SelectGroup)) {
		return
	}
	await handleBookmark(events, client)
}

const parsePostback = (data: string) => {
	const items = data.split(',')
	if (items.length === 0) {
		throw new LineLogicError('不正な入力です')
	}
	return items.reduce((acc, cur) => {
		const kv = cur.split('=')
		if (kv.length < 2) {
			return acc
		}
		const regexpNames = new RegExp(`${kv[0]}=(?<link>.+)`)
		const match = regexpNames.exec(cur);
		if (!match?.groups?.link) {
			return acc
		}
		acc[kv[0]] = match.groups.link
		return acc
	}, {} as { [key: string]: string })
}

const handlePostback: (events: line.PostbackEvent, client: line.Client) => Promise<void> = async (events, client) => {
	const keyValues = parsePostback(events.postback.data)

	if (keyValues['event'] === EventTypes.group) {
		const url = keyValues['url']
		const groupId = keyValues['groupId']
		const owner = keyValues['owner']
		await handleRegisterBookmark(events, client, url, groupId, owner)
		return
	}
	if (keyValues['event'] === EventTypes.defaultGroup) {
		const groupId = keyValues['groupId']
		await handleRegisterDefaultGroup(events, client, groupId)
		return
	}
	if (keyValues['event'] === EventTypes.alwaysSelectGroup) {
		await handleUnregisterDefaultGroup(events, client)
		return
	}
	await client.pushMessage(events.source.userId || '', {
		type: 'text',
		text: '未サポートの機能です'
	})
}



const parseEvents: (events: line.WebhookEvent, client: line.Client) => Promise<void> = async (events, client) => {
	if (!events.source.userId) {
		throw new Error('userId not defined')
	}
	try {
		if (events.type === 'message' && events.message.type === 'text') {
			await handleMessage(events, client)
		}
		else if (events.type === 'postback') {
			await handlePostback(events, client)
		}
		else if (events.type === 'follow') {
			await checkRegistration(events, client)
		}
		else {
			functions.logger.warn(`unsupported event : ${events.type}`)
		}
	} catch (e) {
		if (e instanceof LineLogicError) {
			await client.pushMessage(events.source.userId, {
				type: 'text',
				text: `エラー : ${e.message}`
			})
		} else {
			functions.logger.error(e)
			await client.pushMessage(events.source.userId, {
				type: 'text',
				text: '内部エラーが発生'
			})
		}
	}
}


export const lineBot = functions
	.region('asia-northeast1')
	.https.onRequest(async (request, response) => {
		const channelSecret = functions.config().linebot.secret;
		const stringBody = JSON.stringify(request.body);
		const events = request.body.events[0];
		const headers = request.headers;

		// Verify signature
		const signature = crypto
			.createHmac('SHA256', channelSecret)
			.update(stringBody).digest('base64');

		if (signature !== headers['x-line-signature'] || events === undefined) {
			response.status(200).send();
			throw new Error('Event denied');
		}

		const client = new line.Client({
			channelAccessToken: functions.config().linebot.token
		});

		await parseEvents(events, client)

		functions.logger.log('Send complete the message!');

		response.status(200).send();
	})

