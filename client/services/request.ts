import firebase from './firebaseClient'
import { getCollectionListener } from './firestoreUtil'
const db = firebase.firestore();
const auth = firebase.auth()


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
    db.collection('groups')
        .doc(request.groupId)
        .collection('requests')
        .add(added)
        .then((data) => {
            onSucceeded(data.id)
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
    db.collection('groups')
        .doc(groupId)
        .collection('requests')
        .doc(requestId)
        .set({
            ...request,
            lastUpdate: Date.now()
        }, { merge: true })
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
    let query:
    firebase.firestore.DocumentReference<firebase.firestore.DocumentData> | firebase.firestore.Query<firebase.firestore.DocumentData> = db.collection('groups')
        .doc(groupId)
        .collection('requests')
        
    if(sender){
       query =  sender === 'me' ? query.where('sender', '==', auth.currentUser.uid) : query.where('sender', '==', sender)
    }
    if (status) {
        query = query.where('status', '==', status)
    }
    return query
        .onSnapshot(getCollectionListener(
            onAdded,
            onModified,
            onDeleted
        ))
}

