import React from 'react'
import styles from './index.module.scss'
import { PlaceHolderImg } from '../Image'
import Image from 'next/image'
import UrlImage from './UrlImage'
import GroupImage from './GroupImage'

type Props = {
    src ?: string,
    width ?: string,
    height ?: string
}
const Avatar: React.FC<Props> = ({
    src,
    width,
    height
}) => (
    <div className={styles['avatar-wrapper']} style={{
        width,
        height
    }}>
        {src ? (
            <Image alt='Avatar' className={styles['avatar-image']} src={src} layout='fill' objectFit='cover' />
        ) : (
                <PlaceHolderImg className={styles['avatar-image']} />
            )}
    </div>
)

export default Avatar

export {
    UrlImage,
    GroupImage
}