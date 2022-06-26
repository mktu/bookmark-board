import ogs, { Options, SuccessResult } from 'open-graph-scraper'
import {https, logger} from "firebase-functions";
import fetch from 'node-fetch'

const doScrape = async (url:string) => {
    const options: Options = {
        url,
        timeout: 10000,
        headers: {
            "user-agent": 'bot' ,
        },
    }
    try{
        return await ogs(options)
    }catch(e){
        logger.error(e)
        throw new https.HttpsError('invalid-argument', 'scraping error')
    }
}

const scrape = async (url: string, validate?: boolean) => {
    const ret = await doScrape(url)
    if (ret.error) {
        logger.error(ret.result.error)
        throw new https.HttpsError('invalid-argument', ret.result.error)
    }
    const successData = ret as SuccessResult
    let images : string[] = []
    if(successData.result.ogImage){
        if(Array.isArray(successData.result.ogImage)){
            images = successData.result.ogImage.map(v => typeof v === 'string' ? v : v.url)
        } else {
            images = [successData.result.ogImage.url]
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const twData: any = successData.result
    if (twData.twitterImage) {
        images.push(twData.twitterImage.url as string)
    }
    images = images.filter(Boolean)
    if (validate) {
        images = await validateImages(images)
    }
    //const endTm = Date.now()
    //console.log(`fin:${endTm-startTm2}ms`)
    return {
        title: successData.result.ogTitle,
        description: successData.result.ogDescription,
        url: successData.result.requestUrl,
        images
    }
}

export const validateImages = async (imageUrls: string[]) => {
    const exits = (await Promise.all(imageUrls.map(async v => {
        try {
            const res = await fetch(v, { method: 'HEAD' })
            return res.ok ? v : ''
        } catch (e) {
            logger.error(e)
            return ''
        }
    }))).filter(Boolean)
    return exits
}

export default scrape