import firebase from './firebaseClient'
import { getCollectionListener } from './firestoreUtil'
const db = firebase.firestore();
const auth = firebase.auth()
type AddBookmarkProps = Omit<Bookmark, 'created' | 'updated' | 'idx' | 'id' | 'owner'>

export function addBookmark(
    bookmark: AddBookmarkProps,
    onSucceeded: (id: string) => void,
    onFailed: ErrorHandler = console.error
) {
    
    const time = Date.now()
    const added: Omit<Bookmark, 'id'> = {
        ...bookmark,
        owner : auth.currentUser.uid,
        created: time,
        idx: time
    }
    db.collection('groups')
        .doc(bookmark.groupId)
        .collection('bookmarks')
        .add(added)
        .then((data) => {
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
    const batch = db.batch();
    sortedIds.forEach((id,idx) => {
        const docRef = db
            .collection('groups')
            .doc(groupId)
            .collection('bookmarks')
            .doc(id);
        
        batch.update(docRef, {
            idx
        })
    })
    batch.commit()
        .then(onSucceeded)
        .catch(onFailed)
}

export function modifyBookmark(
    groupId : string,
    bookmarkId : string,
    data : Partial<Bookmark>,
    onSucceeded ?: Notifier,
    onFailed : ErrorHandler = console.error
){
    const merged : Partial<Bookmark> = {
        ...data,
        lastUpdate : Date.now()
    }
    db.collection('groups')
    .doc(groupId)
    .collection('bookmarks')
    .doc(bookmarkId)
    .set(merged, { merge: true })
        .then(onSucceeded)
        .catch(onFailed);
}

export function deleteBookmark(
    groupId : string,
    bookmarkId : string,
    onSucceeded?: Notifier,
    onFailed: ErrorHandler = console.error
){
    db.collection('groups')
    .doc(groupId)
    .collection('bookmarks')
    .doc(bookmarkId)
    .delete()
    .then(onSucceeded)
    .catch(onFailed);
}

export function listenBookmarks(
    groupId: string,
    onAdded: Transfer<Bookmark[]>,
    onModified: Transfer<Bookmark[]>,
    onDeleted: Transfer<Bookmark[]>,
) {
    return db.collection('groups')
        .doc(groupId)
        .collection('bookmarks')
        .onSnapshot(getCollectionListener(
            onAdded,
            onModified,
            onDeleted
        ))
}