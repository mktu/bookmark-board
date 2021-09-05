import firebaseApp from './firebaseClient'
import { getFirestore, collection, where, query, onSnapshot, getDocs, getDoc, addDoc, doc, writeBatch, updateDoc, deleteDoc } from "firebase/firestore";
import { getCollectionSnapshotListener } from './firestoreUtil'

const firestore = getFirestore(firebaseApp)

const getGroupCollection = () => collection(firestore, 'groups')
const getGroupDoc = (groupId: string) => doc(getGroupCollection(), groupId)

export function addGroup(
    group: Partial<BookmarkGroup>,
    onSucceeded: (id: string) => void,
    onFailed: ErrorHandler = console.error
) {
    const time = Date.now()
    addDoc(getGroupCollection(),
        {
            ...group,
            idx: time,
            created: time,
        })
        .then((data) => {
            onSucceeded(data.id)
        })
        .catch(onFailed);
}

export function listenGroups(
    uid: string,
    onAdded: Transfer<BookmarkGroup[]>,
    onModified: Transfer<BookmarkGroup[]>,
    onDeleted: Transfer<BookmarkGroup[]>,
) {
    return onSnapshot(
        query(
            getGroupCollection(), where('users', 'array-contains', uid)
        ),
        getCollectionSnapshotListener(
            onAdded,
            onModified,
            onDeleted
        )
    )
}

export function modifyGroup(
    groupId: string,
    data: Partial<BookmarkGroup>,
    onSucceeded?: Notifier,
    onFailed: ErrorHandler = console.error
) {
    updateDoc(
        getGroupDoc(groupId),
        {
            ...data,
            lastUpdate: Date.now()
        }
    )
        .then(onSucceeded)
        .catch(onFailed);
}

export function deleteGroup(
    groupId: string,
    onSucceeded?: Notifier,
    onFailed: ErrorHandler = console.error
) {
    deleteDoc(
        getGroupDoc(groupId)
    )
        .then(onSucceeded)
        .catch(onFailed)
}

export function getGroups(
    uid: string,
    onSucceeded: Transfer<BookmarkGroup[]>,
    onFailed: ErrorHandler = console.error
) {
    getDocs(
        query(
            getGroupCollection(),
            where('users', 'array-contains', uid)
        )
    )
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
    groupId: string,
    onSucceeded: Transfer<BookmarkGroup>,
    onNotfound: () => void,
    onFailed: ErrorHandler = console.error
) {
    getDoc(
        getGroupDoc(groupId)
    )
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
    const batch = writeBatch(firestore)
    sortedIds.forEach((id, idx) => {
        const docRef = getGroupDoc(id)
        batch.update(docRef, {
            idx
        })
    })
    batch.commit()
        .then(onSucceeded)
        .catch(onFailed)
}