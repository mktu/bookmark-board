import firebaseApp from './firebaseClient'
import { getAuth } from "firebase/auth";
import { getFirestore, collection, where, query, onSnapshot, doc, addDoc, deleteDoc } from "firebase/firestore";
import { getCollectionSnapshotListener } from './firestoreUtil'

const firestore = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

const getReactionCollection = (groupId:string) => collection( doc( collection(firestore,'groups'), groupId ), 'reactions' )
const getReactionDoc = (groupId:string,reactionId:string) => doc(getReactionCollection(groupId), reactionId)

export function addReaction(
    reaction: Omit<Reaction, 'user'|'id'>,
    onSucceeded?: (id: string) => void,
    onFailed: ErrorHandler = console.error
) {
    
    const added: Omit<Reaction, 'id'> = {
        ...reaction,
        user : auth.currentUser.uid,
    }
    addDoc(
        getReactionCollection(reaction.targetId),
        added
    )
        .then((data) => {
            onSucceeded && onSucceeded(data.id)
        })
        .catch(onFailed);
}

export function deleteReaction(
    groupId: string,
    reactionId : string,
    onSucceeded?: Notifier,
    onFailed: ErrorHandler = console.error
){
    deleteDoc(
        getReactionDoc(groupId, reactionId)
    )
    .then(onSucceeded)
    .catch(onFailed);
}

export function listenReactions(
    groupId: string,
    type: Reaction['type'],
    onAdded: Transfer<Reaction[]>,
    onModified: Transfer<Reaction[]>,
    onDeleted: Transfer<Reaction[]>,
) {
    return onSnapshot(
        query(
            getReactionCollection(groupId),
            where('type','==',type)
        ),
        getCollectionSnapshotListener(
            onAdded,
            onModified,
            onDeleted
        )
    )
}