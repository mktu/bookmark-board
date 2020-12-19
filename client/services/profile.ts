import firebase from './firebaseClient'
import { getDocumentListener } from './firestoreUtil'

const db = firebase.firestore();
const storageRef = firebase.storage().ref();
const auth = firebase.auth()

export function addProfile(
    profile: Omit<Profile, 'lastUpdate' | 'id' | 'image'>,
    onSucceeded: (id:string) => void,
    onFailed: ErrorHandler = console.error
) {
    if(!auth.currentUser){
        onFailed(new Error('NOT AUTHENTICATED'))
        return
    }
    db.collection('profiles').doc(auth.currentUser.uid).set({
        ...profile,
        lastUpdate: Date.now()
    })
        .then(()=>{
            onSucceeded(auth.currentUser.uid)
        })
        .catch(onFailed);
}

export function listenProfile(
    uid: string,
    onModified: Transfer<Profile>,
) {
    return db.collection('profiles')
        .doc(uid)
        .onSnapshot(getDocumentListener<Profile>(onModified))
}

export function getMyProfile(
    onSucceeded: Transfer<Profile>,
    onNotfound: () => void,
    onFailed: ErrorHandler = console.error
) {
    if(!auth.currentUser){
        onNotfound()
        return
    }
    getProfile(auth.currentUser.uid,
        onSucceeded,
        onNotfound,
        onFailed)
}

export function getProfile(
    uid: string,
    onSucceeded: Transfer<Profile>,
    onNotfound: () => void,
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

export function getProfiles(
    uids: string[],
    onSucceeded: Transfer<Profile[]>,
    onFailed: ErrorHandler = console.error
) {
    db.collection('profiles')
        .where(firebase.firestore.FieldPath.documentId(), 'in', uids)
        .get()
        .then(function (querySnapshot) {
            const results: Profile[] = [];
            querySnapshot.forEach((data) => {
                if (data.exists) {
                    results.push({
                        id: data.id,
                        ...data.data()
                    } as Profile)
                }
            });
            results.length > 0 && onSucceeded(results)
        })
        .catch(onFailed)
}

export function updateProfile(
    id: string,
    profile: Partial<Profile>,
    onSucceeded?: Notifier,
    onFailed: ErrorHandler = console.error
) {
    db.collection('profiles')
        .doc(id).set({
            ...profile,
            lastUpdate: Date.now()
        }, { merge: true })
        .then(onSucceeded)
        .catch(onFailed);
}

export function uploadProfileImage(
    profileId: string,
    image: Blob,
    onSucceeded: (url: string) => void,
    onProgress?: (progress: number, status: 'paused' | 'running') => void,
    onFailed?: ErrorHandler
) {
    const task = storageRef.child(`profiles/${profileId}`).put(image);
    task.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                onProgress && onProgress(progress, 'paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                onProgress && onProgress(progress, 'running');
                break;
        }
    }, onFailed, () => {
        task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            onSucceeded(downloadURL);
        });
    })
}