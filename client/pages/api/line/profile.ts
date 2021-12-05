import type { NextApiRequest, NextApiResponse } from 'next'
import { getProfile, LineApiError } from '../../../serverside/lineHelpers'
import { getUser } from '../../../services/line'

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.query.idToken) {
        throw new LineApiError(400, 'idToken parameter is undefined.')
    }

    const idToken = req.query.idToken as string
    const { id: userId } = await getUser(idToken)

    const profile = await getProfile(userId)

    res.status(200).json({
        profile
    })
}


const groups = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            res.status(500).end('POST is not supported.')
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