import React from 'react'
import styles from './index.module.scss'
import initials from 'initials'
import Image from 'next/image'
import classNames from 'classnames'
import { PlaceHolderImg } from '../Image'

const bgValues = [
    '#607d8b',
    '#e91e63',
    '#829075',
    '#6f8e9f',
    '#8e7ec3',
    '#c96fb6',
    '#d17293',
    '#d7708f',
    '#e76e5f',
    '#ea7046',
    '#e87245',
    '#da7855',
]

type Props = {
    src?: string,
    width?: string,
    height?: string,
    className?: string,
    name?: string,
    usePlaceholder?: boolean,
    disableNextImage?: boolean
}
const Inner: React.FC<Props> = ({
    src,
    width,
    height,
    name = 'Unknown',
    usePlaceholder,
    disableNextImage
}) => {
    const validSrc = src && src !== ''
    if (validSrc) {
        if (disableNextImage) {
            return <img alt={name} className={styles['avatar-image']} src={src} />
        } else {
            return <Image alt={name} className={styles['avatar-image']} src={src} width={width} height={height} objectFit='cover' />
        }
    }
    if (usePlaceholder) {
        return <PlaceHolderImg width={width} height={height} />
    }
    const ini = initials(name)
    const colodIdx = (name.length * ini.length) % bgValues.length
    return (
        <div className={`flex items-center justify-center rounded-full text-white p-2 overflow-hidden`} style={{
            width,
            height,
            backgroundColor:bgValues[colodIdx],
        }}>
            {ini}
        </div>
    )
}

const AvatarImage: React.FC<Props> = ({
    className,
    width,
    height,
    ...props
}) => {
    return (
        <div className={classNames(styles['avatar-wrapper'], className)} style={{
            width,
            height
        }}>
            <Inner width={width} height={height} {...props}/> 
        </div>
    )
}

export default AvatarImage