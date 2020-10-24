import firebase from './firebaseClient'
import {getDocumentListener} from './firestoreUtil'
const db = firebase.firestore();

export function addProfile(
    nickname: string,
    uid: string,
    onSucceeded : ()=>void,
    onFailed: ErrorHandler = console.error
) {
    db.collection('profiles').doc(uid).set({
        name : nickname,
        lastUpdate: Date.now()
    })
    .then(onSucceeded)
    .catch(onFailed);
}

export function listenProfile(
    uid: string,
    onModified: Transfer<Profile>,
) {
    return db.collection('profiles')
        .doc(uid)
        .onSnapshot(getDocumentListener<Profile>( onModified ))
}

export function getProfile(
    uid: string,
    onSucceeded: Transfer<Profile>,
    onNotfound: ()=> void,
    onFailed: ErrorHandler = console.error
) {
    db.collection('profiles')
        .doc(uid)
        .get()
        .then(function (querySnapshot) {
            if (!querySnapshot.exists) {
                onNotfound()
                return;
            }
            const data = {
                id: querySnapshot.id,
                ...querySnapshot.data()
            } as Profile;
            onSucceeded(data);
        })
        .catch(onFailed);
}