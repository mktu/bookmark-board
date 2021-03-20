import firebase from './firebaseClient'
import {getCollectionListener} from './firestoreUtil'
const db = firebase.firestore();

export function addGroup(
    group: Partial<BookmarkGroup>,
    onSucceeded : (id:string)=>void,
    onFailed: ErrorHandler = console.error
) {
    const time = Date.now()
    db.collection('groups').add({
        ...group,
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
    db.collection('groups').doc(groupId).update({
        ...data,
        lastUpdate: Date.now()
    })
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

export function getGroup(
    groupId : string,
    onSucceeded : Transfer<BookmarkGroup>,
    onNotfound: ()=> void,
    onFailed : ErrorHandler = console.error
){
    db.collection('groups')
    .doc(groupId)
    .get()
    .then((querySnapshot) => {
        if (!querySnapshot.exists) {
            onNotfound()
            return;
        }
        const data = {
            id: querySnapshot.id,
            ...querySnapshot.data()
        } as BookmarkGroup;
        onSucceeded(data);
    })
    .catch(onFailed)
}

export function changeGroupOrder(
    sortedIds: string[],
    onSucceeded?: Notifier,
    onFailed: ErrorHandler = console.error
) {
    const batch = db.batch();
    sortedIds.forEach((id, idx) => {
        const docRef = db
            .collection('groups')
            .doc(id)
        batch.update(docRef, {
            idx
        })
    })
    batch.commit()
        .then(onSucceeded)
        .catch(onFailed)
}