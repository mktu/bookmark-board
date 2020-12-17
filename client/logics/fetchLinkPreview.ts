
const proxy = 'https://cors-anywhere.herokuapp.com';

const logic = async (url:string)=>{
    const response = await fetch(url, {
        headers: {
            'x-requested-with': '',
        },
    });
    const data = await response.text();
    const htmlDoc = new DOMParser().parseFromString(data, 'text/html');
    const images: (string | undefined)[] = [
        { tag: 'meta[property="og:logo"]', attr: 'content' },
        { tag: 'meta[itemprop="logo"]', attr: 'content' },
        { tag: 'img[itemprop="logo"]', attr: 'src' },
        { tag: 'meta[property="og:image"]', attr: 'content' },
        { tag: 'img[class*="logo" i]', attr: 'src' },
        { tag: 'img[src*="logo" i]', attr: 'src' },
        { tag: 'meta[property="og:image:secure_url"]', attr: 'content' },
        { tag: 'meta[property="og:image:url"]', attr: 'content' },
        { tag: 'meta[name="twitter:image:src"]', attr: 'content' },
        { tag: 'meta[name="twitter:image"]', attr: 'content' },
        { tag: 'meta[itemprop="image"]', attr: 'content' },
    ].map(keys => htmlDoc.querySelector(keys.tag)?.getAttribute(keys.attr))
        .filter(Boolean)
        .map(attr => {
            const normalizedUrl = attr?.toLocaleLowerCase();
            if (normalizedUrl?.startsWith('http://') || normalizedUrl?.startsWith('https://')) {
                return attr || undefined;
            }
            return undefined
        })
        .filter(Boolean)

    return {
        title: htmlDoc.querySelector('title')?.innerText || undefined,
        description: htmlDoc.querySelector('meta[name="description"]')?.getAttribute('content') || undefined,
        url: htmlDoc.querySelector('meta[property="og:url"]')?.getAttribute('content') || undefined,
        images
    }
}


const fetchLinkPreview = async (orgUrl: string, useDefaultProxy=true) => {
    const url = useDefaultProxy ? `${proxy}/${orgUrl}` : orgUrl

    return logic(url)
}

export default fetchLinkPreview