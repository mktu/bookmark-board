import firebaseApp from './firebaseClient'
import { getFirestore, collection, onSnapshot, query, addDoc, doc, setDoc, limit } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getCollectionSnapshotListener } from './firestoreUtil'

const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

const getCommentCollection = (groupId: string) => collection(doc(collection(firestore, 'groups'), groupId), 'comments')
const getCommentDoc = (groupId: string, commentId: string) => doc(getCommentCollection(groupId), commentId)

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
    addDoc(getCommentCollection(comment.groupId), added)
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
    if (comment.reactions) {
        setDoc(
            getCommentDoc(groupId, commentId),
            {
                ...comment
            }, { merge: true }
        )
            .then(onSucceeded)
            .catch(onFailed);
    }
    else {
        setDoc(
            getCommentDoc(groupId, commentId),
            {
                ...comment,
                lastUpdate: Date.now()
            }, { merge: true }
        )
            .then(onSucceeded)
            .catch(onFailed);
    }
}

export function listenComments(
    groupId: string,
    limitNum: number,
    onAdded: Transfer<BookmarkComment[]>,
    onModified: Transfer<BookmarkComment[]>,
    onDeleted: Transfer<BookmarkComment[]>,
) {
    return onSnapshot(
        query(getCommentCollection(groupId), limit(limitNum)),
        getCollectionSnapshotListener(
            onAdded,
            onModified,
            onDeleted
        )
    )
}