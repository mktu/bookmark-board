import React, {useState} from 'react'
import styles from './index.module.scss'
import { PlaceHolderImg } from '../Image'

type Props = {
    src ?: string,
    width ?: string,
    height ?: string,
    name ?: string
}
const UrlEndpoint = process.env.NEXT_PUBLIC_IMGKIT_ID

const UrlImage: React.FC<Props> = ({
    src,
    width,
    height,
    name = 'Unknown'
}) => {
    const [useEndpoint,setUseEndpoint] = useState(true)
    return (
        <div className={styles['url-image-wrapper']} style={{
            width,
            height
        }}>
            {src ? (
                <img alt={name} width={width} src={useEndpoint ? `${UrlEndpoint}${src}` : src} loading='lazy' onError={(e)=>{
                    setUseEndpoint(false)
                }}/>
            ) : (
                    <PlaceHolderImg />
                )}
        </div>
    )
}

export default UrlImage