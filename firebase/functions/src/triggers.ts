import * as functions from "firebase-functions"
import { getFirestore, FieldValue } from "firebase-admin/firestore"
import { updateLikes } from './algolia'
import app from './admin'
import { BookmarkGroup } from './types'

const firestore = getFirestore(app)

export const onWriteReactions =
  functions.firestore.document('groups/{groupId}/reactions/{reactionId}')
    .onWrite(async (change, context) => {

      if (change.before.exists && change.after.exists) {
        return
      }
      if (!context.auth?.uid) {
        return
      }

      const groupId = context.params.groupId
      const groupDoc = firestore
        .collection('groups')
        .doc(groupId)
      const group = (await groupDoc.get()).data() as BookmarkGroup

      if (!change.before.exists) {
        // New document Created : add one to count
        await groupDoc.update({ numberOfLikes: FieldValue.increment(1) })
      } else if (!change.after.exists) {
        // Deleting document : subtract one from count
        await groupDoc.update({ numberOfLikes: FieldValue.increment(-1) })
      }
      await updateLikes(groupId, group)
    });