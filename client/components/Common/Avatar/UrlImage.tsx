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

const toNumber = (str?:string)=>{
    if(!str) return 0
    return Number(str.replace('px',''))
}

const UrlImage: React.FC<Props> = ({
    src,
    width,
    height,
    name = 'Unknown',
    enableEndpoint = true
}) => {
    const [useEndpoint,setUseEndpoint] = useState(enableEndpoint)
    const [error,setError] = useState(false)
    const baseWidth = toNumber(width)
    const width1 = `${UrlEndpoint}tr:w-${baseWidth}/${src} ${baseWidth}w`
    const width2 = `${UrlEndpoint}tr:w-${baseWidth*2}/${src} ${baseWidth*2}w`
    const width3 = `${UrlEndpoint}tr:w-${baseWidth*3}/${src} ${baseWidth*3}w`
    const srcset = useEndpoint && baseWidth > 0 && `${width1},${width2},${width3}`
    return (
        <div className={styles['url-image-wrapper']} style={{
            width,
            height
        }}>
            {(src && !error) ? (
                <img alt={name} width={width} src={useEndpoint ? `${UrlEndpoint}${src}` : src} loading='lazy' onError={(e)=>{
                    console.error(e)
                    if(useEndpoint){
                        setUseEndpoint(false)
                    }else{
                        setError(true)
                    }
                }} srcSet={srcset}/>
            ) : (
                    <PlaceHolderImg />
                )}
        </div>
    )
}

export default UrlImage