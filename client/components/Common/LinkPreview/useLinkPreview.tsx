import { useEffect, useState } from 'react'
import { find } from 'linkifyjs';

type Props = {
    text?: string
}

const proxy = 'https://cors-anywhere.herokuapp.com';

const fetchLinkPreview = async (url: string) => {
    const response = await fetch(url, {
        headers: {
            'x-requested-with': '',
        },
    });
    const data = await response.text();
    const htmlDoc = new DOMParser().parseFromString(data, 'text/html');
    const baseUrl = htmlDoc.querySelector('base')?.getAttribute('href') || url;
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
            return baseUrl + attr
        })

    return {
        title: htmlDoc.querySelector('title')?.innerText || undefined,
        description: htmlDoc.querySelector('meta[name="description"]')?.getAttribute('content') || undefined,
        url: htmlDoc.querySelector('meta[property="og:url"]')?.getAttribute('content') || undefined,
        images
    }
}

export type LinkData = {
    title?: string;
    url?: string;
    description?: string;
    images: (string | undefined)[];
}
type Status = 'none' | 'loading' | 'loaded' | 'failed'

const useLinkPreview: (props: Props) => {
    linkData?: LinkData,
    status: Status,
    url?: string
} = ({
    text
}) => {
        const [linkData, setLinkData] = useState<LinkData>()
        const [status, setStatus] = useState<'none' | 'loading' | 'loaded' | 'failed'>('none')
        const inputUrls = find(text)
        const url = inputUrls.length > 0 && inputUrls[0].value

        useEffect(() => {
            if (!url) {
                return
            }
            let cancel = false;
            setStatus('loading')
            fetchLinkPreview(`${proxy}/${url}`).then((data) => {
                !cancel && setLinkData(data)
                setStatus('loaded')
            }).catch((e) => {
                setStatus('failed')
                console.error(e)
            });

            return () => {
                setStatus('none')
                setLinkData(undefined)
                cancel = true;
            }
        }, [url]);

        return {
            linkData,
            status,
            url
        }
    }

export default useLinkPreview