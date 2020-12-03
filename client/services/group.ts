import firebase from './firebaseClient'
import {getCollectionListener} from './firestoreUtil'
const db = firebase.firestore();

export function addGroup(
    name: string,
    uid: string,
    onSucceeded : (id:string)=>void,
    onFailed: ErrorHandler = console.error
) {
    const time = Date.now()
    db.collection('groups').add({
        name : name,
        owner : uid,
        users : [uid],
        actions : [],
        idx: time,
        created : time,
    })
    .then((data)=>{
        onSucceeded(data.id)
    })
    .catch(onFailed);
}

export function listenGroups(
    uid : string,
    onAdded : Transfer<BookmarkGroup[]>,
    onModified : Transfer<BookmarkGroup[]>,
    onDeleted : Transfer<BookmarkGroup[]>,
){
    return db.collection('groups').where('users','array-contains', uid)
    .onSnapshot(getCollectionListener(
        onAdded,
        onModified,
        onDeleted
    ))
}

export function modifyGroup(
    groupId : string,
    data : Partial<BookmarkGroup>,
    onSucceeded ?: Notifier,
    onFailed : ErrorHandler = console.error
){
    db.collection('groups').doc(groupId).set({
        ...data,
        lastUpdate: Date.now()
    }, { merge: true })
        .then(onSucceeded)
        .catch(onFailed);
}

export function deleteGroup(
    groupId : string,
    onSucceeded ?: Notifier,
    onFailed : ErrorHandler = console.error
){
    db.collection('groups').doc(groupId)
    .delete()
    .then(onSucceeded)
    .catch(onFailed)
}

export function getGroups(
    uid : string,
    onSucceeded : Transfer<BookmarkGroup[]>,
    onFailed : ErrorHandler = console.error
){
    db.collection('groups')
    .where('users','array-contains', uid)
    .get()
    .then((querySnapshot) => {
        const results: BookmarkGroup[] = [];
        querySnapshot.forEach((data) => {
            if (data.exists) {
                results.push({
                    id: data.id,
                    ...data.data()
                } as BookmarkGroup)
            }
        });
        results.length > 0 && onSucceeded(results)
    })
    .catch(onFailed)
}