import type { NextApiRequest, NextApiResponse } from 'next'
import { getGroup, getBookmarks, LineApiError, getBookmark, updateBookmark, getProfileByLineId } from '../../../../serverside/lineHelpers'
import { getUser } from '../../../../services/line'
import { parseBookmarkRoutes } from '@utils/routes'

const handleGetBookamrk = async (groupId:string, bookmarkId:string, res: NextApiResponse) => {
    const group = await getGroup(groupId)

    const bookmark = await getBookmark(groupId, bookmarkId)

    res.status(200).json({
        colors: group.colors || {},
        bookmark: bookmark
    })
}

const handleGetBookmarks = async (groupId:string, res: NextApiResponse) => {
    const bookmarks = await getBookmarks(groupId)

    res.status(200).json({
        bookmarks
    })
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const { ids, idToken } = req.query
    if (!idToken) {
        throw new LineApiError(400, 'idToken parameter is undefined.')
    }
    const { id : userId } = await getUser(idToken as string)
    await getProfileByLineId(userId)
    const { groupId, bookmarkId } = parseBookmarkRoutes(ids)
    if (!groupId) {
        throw new LineApiError(400, 'groupId parameter is undefined.')
    }
    if (!bookmarkId) {
        await handleGetBookmarks(groupId, res)
    }else{
        await handleGetBookamrk(groupId, bookmarkId, res)
    }
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    const { ids } = req.query
    const { groupId, bookmarkId } = parseBookmarkRoutes(ids)
    const body = req.body as { idToken: string, update: Partial<Bookmark> }
    const { idToken, update } = body
    if (!idToken) {
        throw new LineApiError(400, 'idToken parameter is undefined.')
    }
    if (!update) {
        throw new LineApiError(400, 'defaultGroup parameter is undefined.')
    }
    if (!bookmarkId) {
        throw new LineApiError(400, 'bookmarkId parameter is undefined.')
    }
    if (!groupId) {
        throw new LineApiError(400, 'groupId parameter is undefined.')
    }
    const { id: userId } = await getUser(idToken)

    if (!userId) {
        throw new LineApiError(404, 'userId is invalid.')
    }

    await updateBookmark(groupId, bookmarkId, update)

    res.status(200).end()
}
const bookmark = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            await handlePost(req, res)
        } else {
            await handleGet(req, res)
        }
    } catch (e) {
        console.error(e)
        if (e instanceof LineApiError) {
            res.status(e.status).end(e.message)
        } else {
            res.status(500).end('Internal error occurred.')
        }
    }
}
export default bookmark