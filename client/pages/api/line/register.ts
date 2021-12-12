import type { NextApiRequest, NextApiResponse } from 'next'
import { isRegisterableLineId, updateProfile, verifyIdToken, LineApiError } from '../../../serverside/lineHelpers'
import { getUser } from '../../../services/line'

const registerLineId = async (req: NextApiRequest, res: NextApiResponse, uid: string) => {
    const body = req.body as { idToken: string, defaultGroup: string }
    const { idToken } = body
    if (!idToken) {
        throw new LineApiError(400, 'idToken parameter is undefined.')
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
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer ")
    ) {
        res.status(403).send("Unauthorized");
        return;
    }
    const idToken = req.headers.authorization.split("Bearer ")[1];
    try {
        const decodedIdToken = await verifyIdToken(idToken);
        if (!decodedIdToken?.uid) {
            throw new LineApiError(403, 'uid is not found')
        }
        await registerLineId(req, res, decodedIdToken.uid)

    } catch (e) {
        console.error(e)
        throw new LineApiError(403, 'Unauthorized')
    }
}


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            await register(req,res)
        } else {
            res.status(500).end('only POST is supported.')
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
export default handler