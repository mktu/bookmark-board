import * as functions from "firebase-functions";
import algoliasearch from 'algoliasearch'
import app from './admin'
import { getFirestore } from 'firebase-admin/firestore'
import { BookmarkGroup, Profile, BookmarkGroupIndex } from './types'

const firestore = getFirestore(app)

const ALGOLIA_ID = functions.config().algolia.appid;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.adminkey;
const ALGOLIA_INDEX_NAME = 'bookmark-group'
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)
const index = client.initIndex(ALGOLIA_INDEX_NAME);

const createIndex = async (groupId: string) => {
    const groupDoc = firestore
        .collection('groups')
        .doc(groupId)
    const group = (await groupDoc.get()).data() as BookmarkGroup
    const owner = (await firestore
        .collection('profiles')
        .doc(group.owner)
        .get()).data() as Profile
    const groupIndex: BookmarkGroupIndex = {
        objectID: groupId,
        owner: owner.name || '',
        ownerId: group.owner,
        ownerImage: owner.image,
        name: group.name,
        description: group.description,
        imageUrl: group.imageUrl,
        lastUpdate: group.lastUpdate,
        created: Date.now()
    }
    await index.saveObject(groupIndex)
    await groupDoc.update({
        searchable: true
    })
}

const deleteIndex = async (groupId: string) => {
    await index.deleteObject(groupId)
    const groupDoc = firestore
        .collection('groups')
        .doc(groupId)
    await groupDoc.update({
        searchable: false
    })
}

const updateIndex = async (groupId: string, group: Partial<BookmarkGroup>) => {
    const data: Partial<BookmarkGroupIndex> = {
        objectID: groupId,
        lastUpdate: Date.now()
    }
    if (group.name) {
        data.name = group.name
    }
    if (group.description) {
        data.description = group.description
    }
    await index.partialUpdateObject(data)
}

const updateLikes = async (groupId: string, group: BookmarkGroup) => {
    const data: Partial<BookmarkGroupIndex> = {
        objectID: groupId,
        lastUpdate: Date.now(),
        numberOfLikes: group?.numberOfLikes
    }
    await index.partialUpdateObject(data)
}
export {
    createIndex,
    deleteIndex,
    updateIndex,
    updateLikes
}