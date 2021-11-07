import * as functions from 'firebase-functions';
import * as crypto from 'crypto';
import * as line from '@line/bot-sdk';

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

		const replyToken = events.replyToken;
		//const userId = events.source.userId;
		const client = new line.Client({
			channelAccessToken: functions.config().linebot.token
		});

		const replyText = (messageFromUser: string): string => {
			const replyMessage = () => {
				switch (messageFromUser) {
					case 'おはよう':
						return 'おはようございます！今日も一日頑張りましょう';
					case 'こんにちは':
						return 'こんにちは！良い天気ですね';
					case 'こんばんは':
						return 'こんばんは！夕飯は食べましたか？';
					default:
						return 'なるほど！';
				}
			}
			return `Userさん、${replyMessage()}`
		}

		const textMessage: line.TextMessage[] = [
			{
				type: 'text',
				text: replyText(events.message.text)
			},
			{
				type: 'text',
				text: `私と話しました`
			}
		];

		client.replyMessage(replyToken, textMessage)
			.then(() => {
				functions.logger.log('Replied to the message!');
			})
			.catch((err) => {
				functions.logger.error(err);
			})
		response.status(200).send();
	})

