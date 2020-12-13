import React from 'react'
import styles from './index.module.scss'
import initials from 'initials'
import Image from 'next/image'
import classNames from 'classnames'
import UrlImage from './UrlImage'
import GroupImage from './GroupImage'
import { PlaceHolderImg } from '../Image'

const bgNames = [
    'primary',
    'secondary',
    'gray',
    'lightslategray',
    'cornflowerblue',
    'orchid',
    'palevioletred',
    'lightcoral',
    'salmon',
    'coral',
    'chocolate',
    'darksalmon'
]

type Props = {
    src?: string,
    width?: string,
    height?: string,
    className?: string,
    name?: string,
    usePlaceholder?: boolean
}
const Avatar: React.FC<Props> = ({
    src,
    width,
    height,
    className,
    name = 'Unknown',
    usePlaceholder
}) => {
    const ini = initials(name)
    const colodIdx = (name.length * ini.length) % bgNames.length
    return (
        <div className={classNames(styles['avatar-wrapper'], className)} style={{
            width,
            height
        }}>
            {src ? (
                <Image alt={name} className={styles['avatar-image']} src={src} layout='fill' objectFit='cover' />
            ) : usePlaceholder ? (
                <PlaceHolderImg className={styles['avatar-image']} width={width} height={height} />
            ) : (
                        <div className={`flex items-center justify-center rounded-full bg-${bgNames[colodIdx]}-500 text-white p-2 overflow-hidden`} style={{
                            width,
                            height,
                        }}>
                            {ini}
                        </div>
                    )}
        </div>
    )
}

export default Avatar

export {
    UrlImage,
    GroupImage,
    Avatar
}