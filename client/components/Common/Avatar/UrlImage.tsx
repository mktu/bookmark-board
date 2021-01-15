import React, { useState } from 'react'
import styles from './index.module.scss'
import { PlaceHolderImg } from '../Image'
import classNames from 'classnames'

type Props = {
    src?: string,
    width?: string,
    fallback?: React.ReactNode
    height?: string,
    name?: string,
    enableEndpoint?: boolean,
    cAtMax?: boolean,
    className?: string,
    onError?:(disableEndpoint?:boolean)=>void
}
const UrlEndpoint = process.env.NEXT_PUBLIC_IMGKIT_ID

const toNumber = (str?: string) => {
    if (!str) return 0
    return Number(str.replace('px', ''))
}

const makeDefaultSrcSet = (useEndpoint: boolean, width?: string, height?: string, src?: string) => {
    const baseWidth = toNumber(width)
    const width1 = `${UrlEndpoint}tr:w-${baseWidth}/${src} ${baseWidth}w`
    const width2 = `${UrlEndpoint}tr:w-${baseWidth * 2}/${src} ${baseWidth * 2}w`
    const width3 = `${UrlEndpoint}tr:w-${baseWidth * 3}/${src} ${baseWidth * 3}w`
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

const makeCAtMaxSrcSet = (useEndpoint: boolean, width?: string, height?: string, src?: string) => {
    const baseWidth = toNumber(width)
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
    width ?: string,
    height ?: string,
    text ?: string
}> = ({
    width,
    height,
    text = '画像が見つかりません'
}) => (
        <div className='flex items-center justify-center text-white text-sm' style={{
            width,
            height,
            backgroundImage: `url('/Placeholder.svg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize:'cover'
        }}>
            {text}
        </div>
    )

const UrlImage: React.FC<Props> = ({
    src,
    width,
    height,
    className,
    fallback,
    cAtMax,
    onError,
    name = 'Unknown',
    enableEndpoint = true,
}) => {
    const [useEndpoint, setUseEndpoint] = useState(enableEndpoint)
    const [error, setError] = useState(false)
    const { style, srcset } = cAtMax ? makeCAtMaxSrcSet(useEndpoint, width, height, src)
        : makeDefaultSrcSet(useEndpoint, width, height, src)

    if (!src || error) {
        if (fallback) {
            return (
                <>{fallback}</>
            )
        }
        return (
            <div className={classNames(styles['url-image-wrapper'], className)} style={{
                width,
                height
            }}>
                <PlaceHolderImg width={width} height={height} />
            </div>
        )
    }
    return (
        <div className={styles['url-image-wrapper']} style={style}>
            <img alt={name} src={useEndpoint ? `${UrlEndpoint}${src}` : src} loading='lazy' onError={() => {
                if (useEndpoint) {
                    setUseEndpoint(false)
                    onError && onError(true)
                } else {
                    setError(true)
                    onError && onError()
                }
            }} srcSet={srcset} />
        </div>
    )
}

export default UrlImage