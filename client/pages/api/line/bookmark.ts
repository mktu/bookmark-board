import type { NextApiRequest, NextApiResponse } from 'next'
import { getGroup, LineApiError, getBookmark, updateBookmark } from '../../../serverside/lineHelpers'
import { getUser } from '../../../services/line'

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.query.groupId) {
        throw new LineApiError(400, 'groupId parameter is undefined.')
    }
    if (!req.query.bookmarkId) {
        throw new LineApiError(400, 'bookmarkId parameter is undefined.')
    }

    const groupId = req.query.groupId as string
    const bookmarkId = req.query.bookmarkId as string

    const group = await getGroup(groupId)

    const bookmark = await getBookmark(groupId, bookmarkId)

    res.status(200).json({
        colors: group.colors || {},
        bookmark: bookmark
    })
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body as { idToken: string, update: Partial<Bookmark>, groupId: string, bookmarkId: string }
    const { idToken, update, bookmarkId, groupId } = body
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