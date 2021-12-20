import type { NextApiRequest, NextApiResponse } from 'next'
import { searchBookmark, getGroups, getProfileByLineId } from '../../../serverside/lineHelpers'
import { ApiError } from '../../../serverside/error'
import { getUser } from '@services/line'

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.query.idToken) {
        throw new ApiError(400, 'idToken parameter is undefined.')
    }
    if (!req.query.target) {
        throw new ApiError(400, 'idToken parameter is undefined.')
    }

    const idToken = req.query.idToken as string
    const target = req.query.target as string
    const { id: userId } = await getUser(idToken)
    const profile = await getProfileByLineId(userId)
    const groups = await getGroups(profile.id)

    const bookmarks = await searchBookmark(target)

    const results = bookmarks.map(bookmark=>{
        const group = groups.find(g=>g.id===bookmark.groupId)
        if(!group){
            return null
        }
        return {
            group,
            bookmark
        }
    }).filter(Boolean)

    res.status(200).json({
        results
    })
}


const search = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            res.status(500).end('POST is not supported.')
        } else {
            await handleGet(req, res)
        }
    } catch (e) {
        console.error(e)
        if (e instanceof ApiError) {
            res.status(e.status).end(e.message)
        } else {
            res.status(500).end('Internal error occurred.')
        }
    }
}
export default search