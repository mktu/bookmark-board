import firebaseApp from './firebaseClient'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, onSnapshot, getDoc, addDoc, doc, writeBatch, setDoc, deleteDoc } from "firebase/firestore";
import { getCollectionSnapshotListener } from './firestoreUtil'
import { removeUndefined } from '../utils'

const firestore = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
type AddBookmarkProps = Omit<Bookmark, 'created' | 'updated' | 'idx' | 'id' | 'owner'>

const getBookmarkCollection = (groupId: string) => collection(doc(collection(firestore, 'groups'), groupId), 'bookmarks')
const getBookmarkDoc = (groupId: string, bookmarkId: string) => doc(getBookmarkCollection(groupId), bookmarkId)

export function addBookmark(
    bookmark: AddBookmarkProps,
    onSucceeded: (id: string) => void,
    onFailed: ErrorHandler = console.error
) {

    const time = Date.now()
    const added: Omit<Bookmark, 'id'> = {
        ...bookmark,
        owner: auth.currentUser.uid,
        created: time,
        idx: time
    }
    addDoc(
        getBookmarkCollection(bookmark.groupId),
        removeUndefined(added)
    ).then((data) => {
        onSucceeded(data.id)
    })
        .catch(onFailed);
}

export function changeOrder(
    groupId: string,
    sortedIds: string[],
    onSucceeded?: Notifier,
    onFailed: ErrorHandler = console.error
) {
    const batch = writeBatch(firestore)
    sortedIds.forEach((id, idx) => {
        const docRef = getBookmarkDoc(groupId, id)
        batch.update(docRef, {
            idx
        })
    })
    batch.commit()
        .then(onSucceeded)
        .catch(onFailed)
}

export function modifyBookmark(
    groupId: string,
    bookmarkId: string,
    data: Partial<Bookmark>,
    onSucceeded?: Notifier,
    onFailed: ErrorHandler = console.error
) {
    const merged: Partial<Bookmark> = {
        ...data,
        lastUpdate: Date.now()
    }
    setDoc(
        getBookmarkDoc(groupId, bookmarkId),
        merged,
        { merge: true }
    )
        .then(onSucceeded)
        .catch(onFailed);
}

export async function modifyBookmarks(
    groupId: string,
    bookmarkIds: string[],
    data: Partial<Bookmark>,
) {
    const merged: Partial<Bookmark> = {
        ...data,
        lastUpdate: Date.now()
    }
    const batch = writeBatch(firestore)
    bookmarkIds.forEach((id) => {
        const docRef = getBookmarkDoc(groupId, id)
        batch.update(docRef, merged)
    })
    await batch.commit()
}

async function moveGroupAsync(
    sourceId: string,
    sourceGroupId: string,
    destGroupId: string,
    copy?: boolean
) {
    const sourceDoc = getBookmarkDoc(sourceGroupId, sourceId)

    const sourceData = await getDoc(sourceDoc)
    const destData = {
        ...sourceData.data(),
        groupId: destGroupId,
        reactions: {},
        lastUpdate: Date.now()
    }
    const batch = writeBatch(firestore)
    const destDoc = doc(getBookmarkCollection(destGroupId))
    batch.set(destDoc, destData)
    if (!copy) {
        batch.delete(sourceDoc)
    }
    await batch.commit()
}

export function moveGroup(
    source: Pick<Bookmark, 'id' | 'groupId'>,
    destGroupId: string,
    onSucceeded?: Notifier,
    copy?: boolean,
    onFailed: ErrorHandler = console.error
) {
    moveGroupAsync(source.id, source.groupId, destGroupId, copy)
        .then(onSucceeded)
        .catch(onFailed)
}

export function deleteBookmark(
    groupId: string,
    bookmarkId: string,
    onSucceeded?: Notifier,
    onFailed: ErrorHandler = console.error
) {
    deleteDoc(
        getBookmarkDoc(groupId, bookmarkId)
    )
        .then(onSucceeded)
        .catch(onFailed);
}

export async function deleteBookmarks(
    groupId: string,
    bookmarkIds: string[],
) {
    const batch = writeBatch(firestore)
    bookmarkIds.forEach((id) => {
        const docRef = getBookmarkDoc(groupId, id)
        batch.delete(docRef)
    })
    await batch.commit()
}

export function listenBookmarks(
    groupId: string,
    onAdded: Transfer<Bookmark[]>,
    onModified: Transfer<Bookmark[]>,
    onDeleted: Transfer<Bookmark[]>,
) {
    return onSnapshot(
        getBookmarkCollection(groupId),
        getCollectionSnapshotListener(
            onAdded,
            onModified,
            onDeleted
        )
    )
}