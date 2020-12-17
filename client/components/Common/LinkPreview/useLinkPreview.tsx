import { useEffect, useState } from 'react'
import { find } from 'linkifyjs';
import {fetchLinkPreview} from '../../../logics'

type Props = {
    text?: string
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
            fetchLinkPreview(url).then((data) => {
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