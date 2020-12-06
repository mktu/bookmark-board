import firebase from './firebaseClient'
import { getCollectionListener } from './firestoreUtil'
const db = firebase.firestore();
const auth = firebase.auth()


export function addComment(
    comment: Omit<BookmarkComment, 'created' | 'updated' | 'sender' | 'readers' | 'id' | 'reactions'>,
    onSucceeded?: (id: string) => void,
    onFailed: ErrorHandler = console.error
) {

    const time = Date.now()
    const added: Omit<BookmarkComment, 'id'> = {
        ...comment,
        readers: [],
        sender: auth.currentUser.uid,
        created: time,
        reactions: []
    }
    db.collection('groups')
        .doc(comment.groupId)
        .collection('comments')
        .add(added)
        .then((data) => {
            onSucceeded(data.id)
        })
        .catch(onFailed);
}

export function updateComment(
    groupId: string,
    commentId: string,
    comment: Partial<BookmarkComment>,
    onSucceeded?: Notifier,
    onFailed: ErrorHandler = console.error
) {
    // TBD comment must be subcollection
    if (comment.reactions) {
        db.collection('groups')
            .doc(groupId)
            .collection('comments')
            .doc(commentId)
            .set({
                ...comment
            }, { merge: true })
            .then(onSucceeded)
            .catch(onFailed);
    }
    else {
        db.collection('groups')
            .doc(groupId)
            .collection('comments')
            .doc(commentId)
            .set({
                ...comment,
                lastUpdate: Date.now()
            }, { merge: true })
            .then(onSucceeded)
            .catch(onFailed);
    }
}

export function listenComments(
    groupId: string,
    limit: number,
    onAdded: Transfer<BookmarkComment[]>,
    onModified: Transfer<BookmarkComment[]>,
    onDeleted: Transfer<BookmarkComment[]>,
) {
    return db.collection('groups')
        .doc(groupId)
        .collection('comments')
        .limit(limit)
        .onSnapshot(getCollectionListener(
            onAdded,
            onModified,
            onDeleted
        ))
}