import * as functions from "firebase-functions";
import scrape from './scrape'
import capture from './capture'
import { lineBot } from './linebot'
import app from './admin'
import { getFirestore } from 'firebase-admin/firestore'
import { onWriteReactions } from './triggers'
import { onCreateInformations, onUpdateInformations, onDeleteInformations } from './information'

const firestore = getFirestore(app)
type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never;

export const scrapeUrl = functions
  .region('asia-northeast1')
  .runWith({
    memory: '1GB'
  })
  .https
  .onCall(async (data) => {
    const url = data.url as string
    if (!url) {
      throw new functions.https.HttpsError('invalid-argument', 'url parameter is undefined.')
    }
    const scrapedInfo = await scrape(url, Boolean(data.validate))
    if (data.capture && scrapedInfo.images.length === 0) {
      const bucketName = functions.config().storage.imagebucket as string
      scrapedInfo.images.push(await capture(url, bucketName))
    }
    return scrapedInfo
  });


export const completeBookmark = functions
  .region('asia-northeast1')
  .runWith({
    memory: '1GB'
  })
  .https
  .onCall(async (data) => {
    const groupId = data.groupId as string
    const bookmarkId = data.bookmarkId as string
    const url = data.url as string
    const useScrape = Boolean(data.scrape)
    if (!groupId || !bookmarkId || !url) {
      throw new functions.https.HttpsError('invalid-argument', `url:${url},bookmarkId:${bookmarkId},groupId:${groupId}`)
    }
    let updateData: Partial<PromiseResolvedType<ReturnType<typeof scrape>> & { image: string, unacquired: boolean }> = { unacquired: false }
    if (useScrape) {
      const scrapedInfo = await scrape(url, true)
      updateData = {
        ...updateData,
        ...scrapedInfo?.title ? { title: scrapedInfo?.title } : {},
        ...scrapedInfo?.description ? { description: scrapedInfo?.description } : {},
        ...{ images: scrapedInfo.images },
        ...scrapedInfo.images.length > 0 ? { image: scrapedInfo.images[0] } : {}
      }
    }

    if (!updateData.image) {
      const bucketName = functions.config().storage.imagebucket as string
      const downloadUrl = await capture(url, bucketName)
      if (downloadUrl) {
        updateData.images = [downloadUrl]
        updateData.image = downloadUrl
      }
    }

    const bookmarkDoc = firestore
      .collection('groups')
      .doc(groupId)
      .collection('bookmarks')
      .doc(bookmarkId)
    await bookmarkDoc.update(updateData)
  });

export {
  onWriteReactions,
  onCreateInformations,
  onUpdateInformations,
  onDeleteInformations,
  lineBot
}