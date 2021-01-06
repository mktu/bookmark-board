import { parse } from 'node-html-parser'
import ogs, {Options, SuccessResult} from 'open-graph-scraper'

const logicOgs = async (url: string) => {
    const startTm2 = Date.now()
    const options : Options = {
        url
    }
    const ret = await ogs(options)
    const endTm = Date.now()
    console.log(`fin:${endTm-startTm2}ms`)
    if(ret.error){
        throw Error(ret.result.error)
    }
    const successData = ret as SuccessResult
    return {
        title: successData.result.ogTitle,
        description: successData.result.ogDescription,
        url: successData.result.requestUrl,
        images : successData.result.ogImage ? [successData.result.ogImage.url] : []
    }
}
// Delete the library when it is no longer needed

export const originalLogic = async (url: string) => {

    const startTm = Date.now()
    const response = await fetch(url, {
        headers: {
            'x-requested-with': '',
        },
    });
    const fetchTm = Date.now()
    const data = await response.text();
    const textTm = Date.now()
    const root = parse(data)
    const baseUrl = root.querySelector('meta[property="og:url"]')?.getAttribute('content') ||
        root.querySelector('meta[name="og:url"]')?.getAttribute('content')
    const resolver = (attr: string) => {
        // resolve relative path
        if (attr.startsWith('/')) {
            return baseUrl && attr && baseUrl + attr
        }
    }
    const images: (string | undefined)[] = [
        { tag: 'meta[property="og:logo"]', attr: 'content' },
        { tag: 'meta[itemprop="logo"]', attr: 'content' },
        { tag: 'img[itemprop="logo"]', attr: 'src' },
        { tag: 'meta[property="og:image"]', attr: 'content', resolver },
        { tag: 'meta[name="og:image"]', attr: 'content', resolver },
        { tag: 'img[class*="logo" i]', attr: 'src' },
        { tag: 'img[src*="logo" i]', attr: 'src' },
        { tag: 'meta[property="og:image:secure_url"]', attr: 'content' },
        { tag: 'meta[property="og:image:url"]', attr: 'content' },
        { tag: 'meta[name="twitter:image:src"]', attr: 'content' },
        { tag: 'meta[name="twitter:image"]', attr: 'content' },
        { tag: 'meta[itemprop="image"]', attr: 'content' },
    ].map(keys => {
        const attr = root.querySelector(keys.tag)?.getAttribute(keys.attr)
        return attr && {
            attr,
            resolver: keys.resolver
        }
    })
        .filter(Boolean)
        .map(data => {
            const { attr, resolver } = data
            const normalizedUrl = attr?.toLocaleLowerCase();
            if (normalizedUrl?.startsWith('http://') || normalizedUrl?.startsWith('https://')) {
                return attr
            }
            return resolver && resolver(attr)
        })
        .filter(Boolean)
    const parseTm = Date.now()
    const exits = (await Promise.all(images.map(async v=>{
        const res = await fetch(v,{ method: 'HEAD' })
        return res.ok ? v : ''
    })) ).filter(Boolean)
    const validateTm = Date.now()
    console.log(`fetch:${fetchTm-startTm}ms, text:${textTm-fetchTm}ms, parse:${parseTm-textTm}ms, validate:${validateTm-parseTm}ms,sum:${validateTm-startTm}`)
    return {
        title: root.querySelector('title')?.innerText || undefined,
        description: root.querySelector('meta[name="description"]')?.getAttribute('content') || undefined,
        url: baseUrl,
        images : exits
    }
}

export default logicOgs