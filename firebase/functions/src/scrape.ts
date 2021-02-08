import ogs, { Options, SuccessResult } from 'open-graph-scraper'

const scrape = async (url: string, validate?: boolean) => {
    const options: Options = {
        url,
        timeout: 10000
    }
    const ret = await ogs(options)

    if (ret.error) {
        throw Error(ret.result.error)
    }
    const successData = ret as SuccessResult
    let images = successData.result.ogImage ? [successData.result.ogImage.url] : []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const twData: any = successData.result
    if (twData.twitterImage) {
        images.push(twData.twitterImage.url as string)
    }
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
            console.error(e)
            return ''
        }
    }))).filter(Boolean)
    return exits
}

export default scrape