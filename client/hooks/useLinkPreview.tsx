import { useEffect, useState, useContext } from 'react'
import { find } from 'linkifyjs';
import FirebaseContext from '../context/FirebaseContext'

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
        const { clientService } = useContext(FirebaseContext)
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
            clientService.scrapeUrl(url,false,false).then(data=>{
                if(cancel){
                    return
                }
                setLinkData(data)
            })
            .catch((e) => {
                if(cancel){
                    return
                }
                setStatus('failed')
                console.error(e)
            })

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