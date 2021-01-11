export type UnsubscribeNotifier = {
    unsubscribe : boolean
}

export function getCollectionListener<T>(
    onAdded: CollectionTransfer<T>,
    onModified: CollectionTransfer<T>,
    onDeleted: CollectionTransfer<T>,
    unsubscribeNotifier ?: UnsubscribeNotifier
) {
    return function (querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) {
        if(unsubscribeNotifier && unsubscribeNotifier.unsubscribe){
            return;
        }
        const added: T[] = [];
        const modified: T[] = [];
        const deleted: T[] = [];
        for (const change of querySnapshot.docChanges()) {
            
            const data = change.doc.data() as T;
            const target = {
                id: change.doc.id,
                ...data
            };
            if (change.type === 'added') { // !! includes initial snapshot
                added.push(target);
            }
            else if (change.type === 'modified') {
                modified.push(target);
            }
            else if (change.type === 'removed') {
                deleted.push(target)
            }
        }
        if (added.length > 0) {
            onAdded(added);
        }
        if (modified.length > 0) {
            onModified(modified);
        }
        if (deleted.length > 0) {
            onDeleted(deleted);
        }
        if(added.length===0 && modified.length===0 && deleted.length===0){
            onAdded(added); // initialize
        }
    }
}

export function getDocumentListener<T>(
    onModified: Transfer<T>
){
    return function (doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>) {
        if(doc.exists){
            const data = doc.data() as T;
            onModified({
                id : doc.id,
                ...data
            });
        }
    }
}