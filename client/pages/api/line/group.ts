import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseAdmin } from '../../../services/firebaseServer'

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.query.user) {
        res.statusCode = 400
        res.status(400).end('url parameter is undefined.')
        return
    }

    const userId = req.query.user as string

    const {docs:profileDocs} = await firebaseAdmin.firestore()
        .collection('profiles')
        .where('lineid', '==', userId)
        .get()

    if (profileDocs.length === 0) {
        res.status(404).end('user not found.')
    }

    const profileId = profileDocs[0].id

    const { docs: groupDocs } = await firebaseAdmin.firestore()
        .collection('groups')
        .where('owner', '==', profileId)
        .get()
        
    if (groupDocs.length === 0) {
        res.status(404).end('group not found.')
    }

    res.status(200).json(groupDocs.filter(v => v.exists).map(v => ({
		...v.data() as BookmarkGroup,
		id: v.id
	})))
}

const group = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        if (req.method === 'POST') {
            res.statusCode = 200
            res.json({ name: 'poteo' })
        } else {
            handleGet(req, res)
        }
    }catch(e){
        console.error(e)
        res.statusCode = 500
        res.status(500).end('Internal error occurred.')
    }
}
export default group