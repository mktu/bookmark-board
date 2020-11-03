import firebase from './firebaseClient'
import { getCollectionListener } from './firestoreUtil'
const db = firebase.firestore();

type AddBookmarkProps = Omit<Bookmark, 'created' | 'updated' | 'idx' | 'id'>

export function addBookmark(
    bookmark: AddBookmarkProps,
    onSucceeded: (id: string) => void,
    onFailed: ErrorHandler = console.error
) {
    const time = Date.now()
    const added: Omit<Bookmark, 'id'> = {
        ...bookmark,
        created: time,
        idx: time
    }
    db.collection('bookmarks').add(added)
        .then((data) => {
            onSucceeded(data.id)
        })
        .catch(onFailed);
}

export function listenBookmarks(
    groupId : string,
    onAdded : Transfer<Bookmark[]>,
    onModified : Transfer<Bookmark[]>,
    onDeleted : Transfer<Bookmark[]>,
){
    return db.collection('bookmarks')
    .where('groupId','==', groupId)
    .onSnapshot(getCollectionListener(
        onAdded,
        onModified,
        onDeleted
    ))
}