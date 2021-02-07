import puppeteer from 'puppeteer'
import chromium from 'chrome-aws-lambda'
import crypto from 'crypto'
import { v5 as uuidv5 } from 'uuid';
import { firebaseAdmin } from '../services/firebaseServer'

const md5FromUrl = (url: string) => {
    const md5hash = crypto.createHash('md5');
    return md5hash.update(url).digest("hex");
}

const capture = async (url: string) => {
    const browser = await puppeteer.launch(process.env.NODE_ENV === 'production'
        ? {
            args: chromium.args,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        }
        : undefined);
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: ['load', 'networkidle0']
    });
    const buffer = await page.screenshot();
    const bucket = firebaseAdmin.storage().bucket(`${process.env.NEXT_PUBLIC_FIRESTORE_STORAGE_IMAGE_BUCKET}`);
    const savePath = `${md5FromUrl(url)}.png`
    const bucketFile = bucket.file(savePath)
    const firebaseStorageDownloadTokens = uuidv5(url, uuidv5.URL)
    await bucketFile.save(buffer, {
        metadata: {
            contentType: 'image/png',
            metadata: {
                firebaseStorageDownloadTokens
            }
        },

    })
    const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIRESTORE_STORAGE_IMAGE_BUCKET}/o/${encodeURIComponent(savePath)}?alt=media&token=${firebaseStorageDownloadTokens}`;
    await browser.close()
    return downloadUrl
}

export default capture