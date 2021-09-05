import firebaseApp from './firebaseClient'
import { getFirestore, collection, query, onSnapshot, getDocs, doc, writeBatch, updateDoc, orderBy, limit } from "firebase/firestore";
import { getCollectionSnapshotListener } from './firestoreUtil'

const firestore = getFirestore(firebaseApp)

const getNotificationCollection = (profileId:string) => collection( doc( collection(firestore, 'profiles'), profileId ), 'notifications' )
const getNotificationDoc = (profileId:string, notificationId:string) => doc( getNotificationCollection(profileId), notificationId )

export async function getNotifications(
    uid: string,
    limitNum = 10
) {
    const notificationSnaps = await getDocs(
        query(
            getNotificationCollection(uid),
            orderBy('created','desc'),
            limit(limitNum)
        )
    )
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
    limitNum = 10
) {
    return onSnapshot(
        query(
            getNotificationCollection(uid),
            orderBy('created','desc'),
            limit(limitNum)
        ),
        getCollectionSnapshotListener(
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
    const batch = writeBatch(firestore)
    targetIds.forEach(id=>{
        const targetDoc = getNotificationDoc(uid,id)
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
    await updateDoc(
        getNotificationDoc(uid,id),
        {
            updated
        }
    )
}