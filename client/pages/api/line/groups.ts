import type { NextApiRequest, NextApiResponse } from 'next'
import { getProfile, updateProfile, LineApiError, getGroups, getGroup } from '../../../serverside/lineHelpers'
import { getUser } from '../../../services/line'

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.query.idToken) {
        throw new LineApiError(400, 'idToken parameter is undefined.')
    }

    const idToken = req.query.idToken as string
    const { id: userId } = await getUser(idToken)

    const profile = await getProfile(userId)

    const { id: profileId, lineInfo } = profile

    const groups = await getGroups(profileId)

    res.status(200).json({
        groups,
        defaultGroup: lineInfo.defaultGroup || ''
    })
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body as { idToken: string, defaultGroup: string }
    const { idToken, defaultGroup } = body
    if (!idToken) {
        throw new LineApiError(400, 'idToken parameter is undefined.')
    }
    if (!defaultGroup) {
        throw new LineApiError(400, 'defaultGroup parameter is undefined.')
    }
    const { id: userId } = await getUser(idToken)

    if (!userId) {
        throw new LineApiError(404, 'userId is invalid.')
    }

    const profile = await getProfile(userId)

    const group = await getGroup(defaultGroup)

    const { id: profileId, lineInfo } = profile

    const newLineInfo = {
        ...lineInfo,
        defaultGroup
    }

    await updateProfile(profileId, {lineInfo : newLineInfo})

    res.status(200).json(group)
}

const groups = async (req: NextApiRequest, res: NextApiResponse) => {
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
export default groups