import { firebaseAdmin } from '../services/firebaseServer'
import { getFirestore } from 'firebase-admin/firestore'
import { ApiError } from './error'

const firestore = getFirestore(firebaseAdmin)

export class LineApiError extends ApiError { }

export const getProfileByLineId = async (userId: string) => {
    const { docs: profileDocs } = await firestore
        .collection('profiles')
        .where('lineid', '==', userId)
        .get()
    if (profileDocs.length === 0) {
        throw new LineApiError(404, 'user not found.')
    }
    const profileId = profileDocs[0].id
    const profile = profileDocs[0].data() as Profile
    return {
        id: profileId,
        ...profile
    }
}

export const isRegisterableLineId = async (userId: string, myUid: string) => {
    const { docs: profileDocs } = await firestore
        .collection('profiles')
        .where('lineid', '==', userId)
        .get()
    if (profileDocs.length === 0) {
        return true
    }
    if (profileDocs.length === 1 && profileDocs[0].id === myUid) {
        return true
    }
    return false
}

export const updateProfile = async (profileId: string, profile: Partial<Profile>) => {
    await firestore
        .collection('profiles')
        .doc(profileId)
        .update(profile)
}

export const getGroups = async (profileId: string) => {

    const { docs } = await firestore
        .collection('groups')
        .where('users', 'array-contains', profileId)
        .get()

    if (docs.length === 0) {
        throw new LineApiError(404, 'no groups found.')
    }

    return docs.filter(v => v.exists).map(v => ({
        ...v.data() as BookmarkGroup,
        id: v.id
    }))
}

export const getGroup = async (groupId: string) => {
    const doc = await firestore
        .collection('groups')
        .doc(groupId)
        .get()
    if (!doc.exists) {
        throw new LineApiError(404, 'selected gropuId is not found.')
    }
    return {
        id: doc.id,
        ...doc.data() as BookmarkGroup
    }
}

export const getBookmarks = async (groupId: string) => {
    const { docs } = await firestore
        .collection('groups')
        .doc(groupId)
        .collection('bookmarks')
        .get()

    if (docs.length === 0) {
        throw new LineApiError(404, 'no bookmarks found.')
    }

    return docs.filter(v => v.exists).map(v => ({
        ...v.data() as Bookmark,
        id: v.id
    }))
}

export const searchBookmark = async (url: string,) => {
    const { docs } = await firestore.collectionGroup('bookmarks')
        .where('url', '==', url)
        .get()

    if (docs.length === 0) {
        throw new LineApiError(404, 'no bookmarks found.')
    }

    return docs.filter(v => v.exists).map(v => ({
        ...v.data() as Bookmark,
        id: v.id
    }))
}

export const getBookmark = async (groupId: string, bookmarkId: string) => {
    const doc = await firestore
        .collection('groups')
        .doc(groupId)
        .collection('bookmarks')
        .doc(bookmarkId)
        .get()

    if (!doc.exists) {
        throw new LineApiError(404, 'bookmark is not found.')
    }
    return {
        id: doc.id,
        ...doc.data() as Bookmark
    }
}

export const updateBookmark = async (groupId: string, bookmarkId: string, update: Partial<Bookmark>) => {
    await firestore
        .collection('groups')
        .doc(groupId)
        .collection('bookmarks')
        .doc(bookmarkId)
        .update(update)
}
