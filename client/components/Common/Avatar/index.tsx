import React from 'react'
import styles from './index.module.scss'
import { PlaceHolderImg } from '../Image'
import Image from 'next/image'
import classNames from 'classnames'
import UrlImage from './UrlImage'
import GroupImage from './GroupImage'

type Props = {
    src ?: string,
    width ?: string,
    height ?: string,
    className ?: string
}
const Avatar: React.FC<Props> = ({
    src,
    width,
    height,
    className
}) => (
    <div className={classNames(styles['avatar-wrapper'],className)} style={{
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
    GroupImage,
    Avatar
}