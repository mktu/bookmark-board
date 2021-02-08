import * as functions from "firebase-functions";
import scrape from './scrape'
import capture from './capture'


export const scrapeUrl = functions
  .region('asia-northeast1')
  .runWith({
    memory : '1GB'
  })
  .https
  .onCall(async (data) => {
    const url = data.url as string
    if (!url) {
      throw new functions.https.HttpsError('invalid-argument', 'url parameter is undefined.')
    }
    const scrapedInfo =  await scrape(url, Boolean(data.validate))
    if(data.capture && scrapedInfo.images.length === 0){
      const bucketName = functions.config().storage.imagebucket as string
      scrapedInfo.images.push(await capture(url, bucketName))
    }
    return scrapedInfo
  });

export const captureUrl = functions
.region('asia-northeast1')
.https
.onCall(async (data) => {
  const url = data.url as string
  if (!url) {
    throw new functions.https.HttpsError('invalid-argument', 'url parameter is undefined.')
  }
  const bucketName = functions.config().storage.imagebucket as string
  return await capture(url, bucketName)
});