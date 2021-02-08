//const proxy = 'https://cors-anywhere.herokuapp.com';
const proxy = 'https://mysterious-coast-24489.herokuapp.com';

const logic = async (url: string) => {
    const response = await fetch(url, {
        headers: {
            'x-requested-with': '',
        },
    });
    const data = await response.text();
    const htmlDoc = new DOMParser().parseFromString(data, 'text/html')
    const baseUrl = htmlDoc.querySelector('meta[property="og:url"]')?.getAttribute('content') ||
        htmlDoc.querySelector('meta[name="og:url"]')?.getAttribute('content')
    const resolver = (attr: string) => {
        // resolve relative path
        if(attr.startsWith('/')){
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
        const attr = htmlDoc.querySelector(keys.tag)?.getAttribute(keys.attr)
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
    return {
        title: htmlDoc.querySelector('title')?.innerText || undefined,
        description: htmlDoc.querySelector('meta[name="description"]')?.getAttribute('content') || undefined,
        url: baseUrl,
        images
    }
}


const fetchLinkPreview = async (orgUrl: string, useDefaultProxy = true) => {
    const url = useDefaultProxy ? `${proxy}/${orgUrl}` : orgUrl

    return logic(url)
}

export const fetchFromServer = async(url:string,useValidate:boolean,useCapture:boolean) =>{
    const cloudFunctionUrl = `${process.env.NEXT_PUBLIC_FIREBASE_FUNCTION_ROOT}/urls?url=${url}`
    const target = `/api/urls?url=${url}&useValidate=${useValidate}&useCapture=${useCapture}`
    const response = await fetch(cloudFunctionUrl);
    if(!response.ok){
        throw Error(response.statusText)
    }
    const data = await response.json()
    return data as ReturnType<typeof fetchLinkPreview>;
}

export default fetchLinkPreview