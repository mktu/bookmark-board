import React, { CSSProperties, useState } from 'react'
import { PlaceHolderImg } from '../Image'

type ObjectFit = 'cover' | 'contain' 

type Props = {
    src?: string,
    width?: number,
    fallback?: React.ReactNode
    height?: number,
    name?: string,
    enableEndpoint?: boolean,
    objectFit?: ObjectFit
    cAtMax?: boolean,
    className?: string,
    style?: React.CSSProperties,
    onError?: (disableEndpoint?: boolean) => void
}
const UrlEndpoint = process.env.NEXT_PUBLIC_IMGKIT_ID

const makeDefaultSrcSet = (useEndpoint: boolean, width?: number, height?: number, src?: string) => {
    const baseWidth = width || 0
    const width1 = `${UrlEndpoint}tr:w-${baseWidth}/${src} ${baseWidth}w`
    const width2 = `${UrlEndpoint}tr:w-${baseWidth * 2}/${src} ${baseWidth * 2}w`
    const width3 = `${UrlEndpoint}tr:w-${baseWidth * 3}/${src} ${baseWidth * 3}w`
    const srcset = (useEndpoint && baseWidth > 0) ? `${width1},${width2},${width3}` : undefined
    const style: React.CSSProperties = {
        maxWidth: width,
        maxHeight: height,
    }
    return {
        style,
        srcset
    }
}

const makeCAtMaxSrcSet = (useEndpoint: boolean, width?: number, height?: number, src?: string) => {
    const baseWidth = width || 0
    const width1 = `${UrlEndpoint}tr:w-${baseWidth},h-${baseWidth},c-at_max/${src} ${baseWidth}w`
    const width2 = `${UrlEndpoint}tr:w-${baseWidth * 2},h-${baseWidth * 2},c-at_max/${src} ${baseWidth * 2}w`
    const width3 = `${UrlEndpoint}tr:w-${baseWidth * 3},h-${baseWidth * 3},c-at_max/${src} ${baseWidth * 3}w`
    const srcset = (useEndpoint && baseWidth > 0) ? `${width1},${width2},${width3}` : undefined
    const style: React.CSSProperties = {
        maxWidth: width,
        maxHeight: height
    }
    return {
        style,
        srcset
    }
}

export const NotFound: React.FC<{
    width?: number,
    height?: number,
    text?: string
    style?:CSSProperties
}> = ({
    width,
    height,
    style,
    text = '画像が見つかりません'
}) => (
        <div className='flex items-center justify-center text-white text-sm' style={{
            width,
            height,
            backgroundImage: `url('/Placeholder.svg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            ...style
        }}>
            {text}
        </div>
    )

const objectFits : {[type in ObjectFit] : React.CSSProperties} = {
    cover : {
        objectFit: 'cover', objectPosition: '50% 50%'
    },
    contain : {
        objectFit: 'contain',
    } 
}

const UrlImage: React.FC<Props> = ({
    src,
    width,
    height,
    className,
    fallback,
    cAtMax,
    onError,
    objectFit = 'cover',
    style = {},
    name = 'Unknown',
    enableEndpoint = true,
}) => {
    const [useEndpoint, setUseEndpoint] = useState(enableEndpoint)
    const [error, setError] = useState(false)
    const { srcset } = cAtMax ? makeCAtMaxSrcSet(useEndpoint, width, height, src)
        : makeDefaultSrcSet(useEndpoint, width, height, src)

    if (!src || error) {
        if (fallback) {
            return (
                <>{fallback}</>
            )
        }
        const w = width || 0
        const h = height || 0
        return (
            <div className={className} style={{
                width,
                height
            }}>
                <PlaceHolderImg width={w} height={h} />
            </div>
        )
    }
    //width: 100%; height: auto
    // https://parashuto.com/rriver/development/img-size-attributes-are-back
    return (
        <img className={className} alt={name} src={useEndpoint ? `${UrlEndpoint}${src}` : src} loading='lazy' onError={() => {
            if (useEndpoint) {
                setUseEndpoint(false)
                onError && onError(true)
            } else {
                setError(true)
                onError && onError()
            }
        }} srcSet={srcset} style={{ width, height, ...objectFits[objectFit], ...style }} />
    )
}

export default UrlImage