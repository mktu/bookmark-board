import firebase from './firebaseClient'
import { getCollectionListener } from './firestoreUtil'

const db = firebase.firestore();

export async function getNotifications(
    uid: string,
    limit = 10
) {
    const notificationSnaps = await db.collection('profiles')
        .doc(uid)
        .collection('notifications')
        .orderBy('created','desc')
        .limit(limit)
        .get()
    const notifications : UserNotification[] = []
    notificationSnaps.forEach(snap=>{
        if(!snap.exists){
            return
        }
        notifications.push({
            id : snap.id,
            ...snap.data()
        } as UserNotification)
    })
    return notifications
}

export function listenNotifications(
    uid: string,
    onAdded: Transfer<UserNotification[]>,
    onModified: Transfer<UserNotification[]>,
    onDeleted: Transfer<UserNotification[]>,
    limit = 10
) {
    return db.collection('profiles')
        .doc(uid)
        .collection('notifications')
        .orderBy('created','desc')
        .limit(limit)
        .onSnapshot(
            getCollectionListener(
                onAdded,
                onModified,
                onDeleted
            )
        )
}

export async function readNotifications(
    uid: string,
    targetIds:string[]
) {
    const batch = db.batch()
    targetIds.forEach(id=>{
        const targetDoc = db.collection('profiles')
        .doc(uid)
        .collection('notifications')
        .doc(id)
        batch.update(targetDoc,{
            read:true
        })
    })
    await batch.commit()
}

export async function updateNotification(
    uid: string,
    data:UserNotification
) {
    const {id, ...updated} = data
    await db.collection('profiles')
        .doc(uid)
        .collection('notifications')
        .doc(id)
        .update({
            updated
        })
}