import React from 'react'
import styles from './index.module.scss'
import { PlaceHolderImg } from '../Image'

type Props = {
    src ?: string,
    width ?: string,
    height ?: string
}
const UrlImage: React.FC<Props> = ({
    src,
    width,
    height
}) => (
    <div className={styles['url-image-wrapper']} style={{
        width,
        height
    }}>
        {src ? (
            <img alt='Avatar' src={src} />
        ) : (
                <PlaceHolderImg />
            )}
    </div>
)

export default UrlImage