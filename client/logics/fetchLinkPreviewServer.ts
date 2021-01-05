import { parse } from 'node-html-parser'

const logic = async (url: string) => {
    const response = await fetch(url, {
        headers: {
            'x-requested-with': '',
        },
    });
    const data = await response.text();
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
    return {
        title: root.querySelector('title')?.innerText || undefined,
        description: root.querySelector('meta[name="description"]')?.getAttribute('content') || undefined,
        url: baseUrl,
        images
    }
}

export default logic