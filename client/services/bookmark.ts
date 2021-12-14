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

export async function moveGroupAsync(
    sources: Pick<Bookmark, 'id' | 'groupId'>[],
    destGroupId: string,
    copy?: boolean
) {
    const batch = writeBatch(firestore)
    const promises = sources.map(async (source)=>{
        const {id : sourceId, groupId : sourceGroupId} = source
        const sourceDoc = getBookmarkDoc(sourceGroupId, sourceId)

        const sourceData = await getDoc(sourceDoc)
        const time = Date.now()
        const destData = {
            ...sourceData.data(),
            groupId: destGroupId,
            reactions: {},
            lastUpdate: time,
            idx : time
        } as Bookmark
        const destDoc = doc(getBookmarkCollection(destGroupId))
        batch.set(destDoc, destData)
        if (!copy) {
            batch.delete(sourceDoc)
        }
    })
    await Promise.all(promises)
    await batch.commit()
}

export function moveGroup(
    sources: Pick<Bookmark, 'id' | 'groupId'>[],
    destGroupId: string,
    onSucceeded?: Notifier,
    copy?: boolean,
    onFailed: ErrorHandler = console.error
) {
    moveGroupAsync(sources, destGroupId, copy)
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