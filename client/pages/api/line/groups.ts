import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseAdmin } from '../../../services/firebaseServer'
import { getUser } from '@hooks/useLineLogin'

const getProfile = async (userId: string) => {
    const { docs: profileDocs } = await firebaseAdmin.firestore()
        .collection('profiles')
        .where('lineid', '==', userId)
        .get()
    if (profileDocs.length === 0) {
        return null
    }
    const profileId = profileDocs[0].id
    const profile = profileDocs[0].data() as Profile
    return {
        id: profileId,
        ...profile
    }
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.query.idToken) {
        res.status(400).end('idToken parameter is undefined.')
        return
    }

    const idToken = req.query.idToken as string
    const { id: userId } = await getUser(idToken)

    const profile = await getProfile(userId)

    if (!profile) {
        res.status(404).end('user not found.')
    }

    const { id: profileId, lineInfo } = profile

    const { docs: groupDocs } = await firebaseAdmin.firestore()
        .collection('groups')
        .where('owner', '==', profileId)
        .get()

    if (groupDocs.length === 0) {
        res.status(404).end('group not found.')
    }

    res.status(200).json({
        groups: groupDocs.filter(v => v.exists).map(v => ({
            ...v.data() as BookmarkGroup,
            id: v.id
        })),
        defaultGroup: lineInfo.defaultGroup || ''
    })
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body as { idToken: string, defaultGroup: string }
    const { idToken, defaultGroup } = body
    if (!idToken) {
        res.status(400).end('idToken parameter is undefined.')
        return
    }
    if (!defaultGroup) {
        res.status(400).end('defaultGroup parameter is undefined.')
        return
    }
    const { id: userId } = await getUser(idToken)

    if (!userId) {
        res.status(404).end('userId is invalid.')
        return
    }

    const profile = await getProfile(userId)

    if (!profile) {
        res.status(404).end('user not found.')
        return
    }


    const groupSnapshot = await firebaseAdmin.firestore()
        .collection('groups')
        .doc(defaultGroup)
        .get()

    if (!groupSnapshot.exists) {
        res.status(404).end('defaultGroup is not found')
        return
    }

    const { id: profileId, lineInfo } = profile

    const newLineInfo = {
        ...lineInfo,
        defaultGroup
    }

    await firebaseAdmin.firestore()
        .collection('profiles')
        .doc(profileId)
        .update({
            lineInfo: newLineInfo
        })

    res.status(200).json({
        id: defaultGroup,
        ...groupSnapshot.data()
    })
}

const group = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            await handlePost(req, res)
        } else {
            await handleGet(req, res)
        }
    } catch (e) {
        console.error(e)
        res.status(500).end('Internal error occurred.')
    }
}
export default group