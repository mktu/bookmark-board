import React, {useState} from 'react'
import styles from './index.module.scss'
import { PlaceHolderImg } from '../Image'

type Props = {
    src ?: string,
    width ?: string,
    height ?: string,
    name ?: string,
    enableEndpoint ?: boolean
}
const UrlEndpoint = process.env.NEXT_PUBLIC_IMGKIT_ID

const UrlImage: React.FC<Props> = ({
    src,
    width,
    height,
    name = 'Unknown',
    enableEndpoint = true
}) => {
    const [useEndpoint,setUseEndpoint] = useState(enableEndpoint)
    return (
        <div className={styles['url-image-wrapper']} style={{
            width,
            height
        }}>
            {src ? (
                <img alt={name} width={width} src={useEndpoint ? `${UrlEndpoint}tr:w-${width}/${src}` : src} loading='lazy' onError={()=>{
                    setUseEndpoint(false)
                }}/>
            ) : (
                    <PlaceHolderImg />
                )}
        </div>
    )
}

export default UrlImage