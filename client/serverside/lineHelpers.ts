import { firebaseAdmin } from '../services/firebaseServer'

export class LineApiError extends Error {
    status: number
    constructor(status: number, e?: string) {
        super(e);
        this.name = new.target.name;
        this.status = status
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export const getProfile = async (userId: string) => {
    const { docs: profileDocs } = await firebaseAdmin.firestore()
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

export const updateProfile = async (profileId: string, profile: Partial<Profile>) => {
    await firebaseAdmin.firestore()
        .collection('profiles')
        .doc(profileId)
        .update(profile)
}

export const getGroups = async (profileId: string) => {

    const { docs } = await firebaseAdmin.firestore()
        .collection('groups')
        .where('owner', '==', profileId)
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
    const doc = await firebaseAdmin.firestore()
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
    const { docs } = await firebaseAdmin.firestore()
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

export const getBookmark = async (groupId: string, bookmarkId: string) => {
    const doc = await firebaseAdmin.firestore()
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
    await firebaseAdmin.firestore()
        .collection('groups')
        .doc(groupId)
        .collection('bookmarks')
        .doc(bookmarkId)
        .update(update)
}
