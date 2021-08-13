import * as functions from "firebase-functions"
import firebaseAdmin from './admin'
import { Notification, Information } from './types'

const getProfileIds = async ()=> {
  const profileDocs = await firebaseAdmin.firestore()
  .collection('profiles')
  .get()
  const profileIds : string[] = []
  profileDocs.forEach(doc=>{
      if(doc.exists){
        profileIds.push(doc.id)
      }
  })
  return profileIds
}

export const onCreateInformations =
  functions.firestore.document('informations/{informationId}')
    .onCreate(async (change) => {
        const profileIds = await getProfileIds()
        const content =  change.data() as Information
        const batch = firebaseAdmin.firestore().batch()
        profileIds.forEach(id=>{
          const doc = firebaseAdmin.firestore()
            .collection('profiles')
            .doc(id)
            .collection('notifications')
            .doc()
          batch.set(doc, {
            type : 'information',
            content : content.content,
            contentUrl : content.contentUrl || '',
            sourceId : change.id,
            priority : content.priority || 'normal',
            read : false,
            created : Date.now()
          } as Notification)
        })
        await batch.commit()
    });

export const onUpdateInformations =
  functions.firestore.document('informations/{informationId}')
    .onUpdate(async (change) => {
        const profileIds = await getProfileIds()
        const content =  change.after.data() as Information
        const batch = firebaseAdmin.firestore().batch()
        const snapPromises = profileIds.map(async (id)=>{
          return await firebaseAdmin.firestore()
            .collection('profiles')
            .doc(id)
            .collection('notifications')
            .where('sourceId', '==', change.after.id)
            .get()
        })
        const snaps = await Promise.all(snapPromises)
        snaps.forEach(snap=>{
          if(snap.empty){
            return
          }
          const doc = snap.docs[0].ref
          batch.update(doc, {
            content : content.content,
            contentUrl : content.contentUrl || '',
            priority : content.priority || 'normal',
            lastUpdate : Date.now()
          } as Notification)
        })
        await batch.commit()
    });