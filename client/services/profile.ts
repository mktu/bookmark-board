import firebaseApp from './firebaseClient'
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, where, query, onSnapshot, getDocs, getDoc, doc, setDoc, documentId } from "firebase/firestore";
import { getDocumentSnapshotListener } from './firestoreUtil'

const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)
const auth = getAuth(firebaseApp)

const getProfileCollection = () => collection(firestore, 'profiles')
const getProfileDoc = (profileId: string) => doc(getProfileCollection(), profileId)

export function addProfile(
    profile: Omit<Profile, 'lastUpdate' | 'id' | 'image'>,
    onSucceeded: (id: string) => void,
    onFailed: ErrorHandler = console.error
) {
    if (!auth.currentUser) {
        onFailed(new Error('NOT AUTHENTICATED'))
        return
    }
    setDoc(
        getProfileDoc(auth.currentUser.uid),
        {
            ...profile,
            lastUpdate: Date.now()
        }
    )
        .then(() => {
            onSucceeded(auth.currentUser.uid)
        })
        .catch(onFailed);
}

export function listenProfile(
    uid: string,
    onModified: Transfer<Profile>,
) {
    return onSnapshot(
        getProfileDoc(uid),
        getDocumentSnapshotListener<Profile>(onModified)
    )
}

export function getMyProfile(
    onSucceeded: Transfer<Profile>,
    onNotfound: () => void,
    onFailed: ErrorHandler = console.error
) {
    if (!auth.currentUser) {
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
    getDoc(
        getProfileDoc(uid)
    )
        .then(function (querySnapshot) {
            if (!querySnapshot.exists()) {
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
    getDocs(
        query(
            getProfileCollection(),
            where(documentId(), 'in', uids)
        )
    )
        .then(function (querySnapshot) {
            const results: Profile[] = [];
            querySnapshot.forEach((data) => {
                if (data.exists()) {
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
    setDoc(
        getProfileDoc(id),
        {
            ...profile,
            lastUpdate: Date.now()
        }, { merge: true }
    )
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
    const task = uploadBytesResumable(ref(storage, `profiles/${profileId}`), image)
    task.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
            case 'paused': // or 'paused'
                onProgress && onProgress(progress, 'paused');
                break;
            case 'running': // or 'running'
                onProgress && onProgress(progress, 'running');
                break;
        }
    }, onFailed, () => {
        getDownloadURL(task.snapshot.ref).then(function (downloadURL) {
            onSucceeded(downloadURL);
        });
    })
}