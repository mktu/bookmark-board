import firebaseApp from './firebaseClient'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage(firebaseApp)

export function uploadFile(
    path: string,
    file: Blob,
    onSucceeded: (url: string) => void,
    onProgress?: (progress: number, status: 'paused' | 'running') => void,
    onFailed?: ErrorHandler
) {
    const task = uploadBytesResumable(ref(storage, path), file)
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