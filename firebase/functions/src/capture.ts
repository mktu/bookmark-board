import app from './admin'
import { getStorage } from 'firebase-admin/storage'
import puppeteer from 'puppeteer'
import crypto from 'crypto'
import { v5 as uuidv5 } from 'uuid';

const storage = getStorage(app)

const md5FromUrl = (url: string) => {
    const md5hash = crypto.createHash('md5');
    return md5hash.update(url).digest("hex");
}

const capture = async (url: string, bucketName: string) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: ['load', 'networkidle0']
    });
    const buffer = await page.screenshot();
    const bucket = storage.bucket(bucketName);
    const savePath = `${md5FromUrl(url)}.png`
    const bucketFile = bucket.file(savePath)
    const firebaseStorageDownloadTokens = uuidv5(url, uuidv5.URL)
    await bucketFile.save(buffer as Buffer, {
        metadata: {
            contentType: 'image/png',
            metadata: {
                firebaseStorageDownloadTokens
            }
        },

    })
    const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(savePath)}?alt=media&token=${firebaseStorageDownloadTokens}`;
    await browser.close()
    return downloadUrl
}

export default capture