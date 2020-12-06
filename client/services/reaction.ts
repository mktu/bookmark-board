import firebase from './firebaseClient'
import { getCollectionListener } from './firestoreUtil'
const db = firebase.firestore();
const auth = firebase.auth()


export function addReaction(
    reaction: Omit<Reaction, 'user'|'id'>,
    onSucceeded?: (id: string) => void,
    onFailed: ErrorHandler = console.error
) {
    
    const added: Omit<Reaction, 'id'> = {
        ...reaction,
        user : auth.currentUser.uid,
    }
    db.collection('groups')
        .doc(reaction.targetId)
        .collection('reactions')
        .add(added)
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
    db.collection('groups')
    .doc(groupId)
    .collection('reactions')
    .doc(reactionId)
    .delete()
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
    return db.collection('groups')
        .doc(groupId)
        .collection('reactions')
        .where('type','==',type)
        .onSnapshot(getCollectionListener(
            onAdded,
            onModified,
            onDeleted
        ))
}