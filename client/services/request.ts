import firebaseApp from './firebaseClient'
import { getFirestore, collection, where, query, onSnapshot, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getCollectionSnapshotListener } from './firestoreUtil'

const firestore = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

const getRequestCollection = (groupId: string) => collection(doc(collection(firestore, 'groups'), groupId), 'requests')
const getReactionDoc = (groupId: string, reactionId: string) => doc(getRequestCollection(groupId), reactionId)

export function addRequest(
    request: Omit<BookmarkRequest, 'status' | 'created' | 'updated' | 'sender' | 'id'>,
    onSucceeded?: (id: string) => void,
    onFailed: ErrorHandler = console.error
) {

    const time = Date.now()
    const added: Omit<BookmarkRequest, 'id'> = {
        ...request,
        sender: auth.currentUser.uid,
        created: time,
        status: 'requesting'
    }
    addDoc(
        getRequestCollection(request.groupId),
        added
    )
        .then((data) => {
            onSucceeded && onSucceeded(data.id)
        })
        .catch(onFailed);
}

export function updateRequest(
    groupId: string,
    requestId: string,
    request: Partial<BookmarkRequest>,
    onSucceeded?: Notifier,
    onFailed: ErrorHandler = console.error
) {
    setDoc(
        getReactionDoc(groupId, requestId),
        {
            ...request,
            lastUpdate: Date.now()
        }, { merge: true }
    )
        .then(onSucceeded)
        .catch(onFailed);
}

export function removeRequest(
    groupId: string,
    requestId: string,
    onSucceeded?: Notifier,
    onFailed: ErrorHandler = console.error
) {
    deleteDoc(
        getReactionDoc(groupId, requestId)
    )
        .then(onSucceeded)
        .catch(onFailed);
}

export function listenRequest(
    {
        groupId,
        onAdded,
        onModified,
        onDeleted,
        status,
        sender
    }: {
        groupId: string,
        onAdded: Transfer<BookmarkRequest[]>,
        onModified: Transfer<BookmarkRequest[]>,
        onDeleted: Transfer<BookmarkRequest[]>,
        status?: BookmarkRequest['status'],
        sender?: string
    }
) {
    const col = getRequestCollection(groupId)
    let requestQuery : ReturnType<typeof query> | typeof col = col

    if (sender) {
        requestQuery = sender === 'me' ?
            query(
                col,
                where('sender', '==', auth.currentUser.uid)
            ) :
            query(
                col,
                where('sender', '==', sender)
            )
    }
    if (status) {
        requestQuery = query(
            col,
            where('status', '==', status)
        )
    }
    return onSnapshot(
        requestQuery,
        getCollectionSnapshotListener(
            onAdded,
            onModified,
            onDeleted
        )
    )
}

