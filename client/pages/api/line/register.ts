import type { NextApiRequest, NextApiResponse } from 'next'
import { isRegisterableLineId, updateProfile, LineApiError } from '../../../serverside/lineHelpers'
import { getFirebaseUid, getIdToken } from '../../../serverside/auth'
import { ApiError } from '../../../serverside/error'
import { getUser } from '@services/line'

const registerLineId = async (req: NextApiRequest, res: NextApiResponse, uid: string) => {
    const body = req.body as { idToken: string, defaultGroup: string }
    const { idToken } = body
    if (!idToken) {
        throw new ApiError(400, 'idToken parameter is undefined.')
    }
    const { id: lineid, name } = await getUser(idToken)

    if (!(await isRegisterableLineId(lineid, uid))) {
        throw new LineApiError(409, 'selected line id is alreadey used')
    }

    await updateProfile(uid, {
        lineid,
        lineInfo: {
            id: lineid,
            name,
            defaultGroup: ''
        }
    })

    res.status(200).end()
}

const register = async (req: NextApiRequest, res: NextApiResponse) => {
    const idToken = getIdToken(req)
    const uid = await getFirebaseUid(idToken);
    await registerLineId(req, res, uid)
}


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            await register(req, res)
        } else {
            res.status(500).end('only POST is supported.')
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
export default handler