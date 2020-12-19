import firebase from './firebaseClient'
const storageRef = firebase.storage().ref();

export function uploadFile(
    path: string,
    file: Blob,
    onSucceeded: (url: string) => void,
    onProgress?: (progress: number, status: 'paused' | 'running') => void,
    onFailed?: ErrorHandler
) {
    const task = storageRef.child(path).put(file);
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