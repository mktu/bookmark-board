import type { NextApiRequest } from 'next'
import { firebaseAdmin } from '@services/firebaseServer'
import { getAuth } from 'firebase-admin/auth'
import { ApiError } from './error'

const auth = getAuth(firebaseAdmin)

export const getIdToken = (req: NextApiRequest) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer ")
    ) {
        throw new ApiError(403, "Unauthorized")
    }
    return req.headers.authorization.split("Bearer ")[1];
}

export const getFirebaseUid = async (idToken: string) => {
    try {
        const decodedIdToken = await auth.verifyIdToken(idToken)
        if (!decodedIdToken?.uid) {
            throw new ApiError(403, 'uid is not found')
        }
        return decodedIdToken.uid

    } catch (e) {
        console.error(e)
        throw new ApiError(403, 'Unauthorized')
    }
}