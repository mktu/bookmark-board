import React from 'react'
import styles from './index.module.scss'
import { PlaceHolderImg } from '../Image'

type Props = {
    src ?: string,
    width ?: string,
    height ?: string,
    name ?: string
}
const UrlImage: React.FC<Props> = ({
    src,
    width,
    height,
    name = 'Unknown'
}) => (
    <div className={styles['url-image-wrapper']} style={{
        width,
        height
    }}>
        {src ? (
            <img alt={name} src={src}/>
        ) : (
                <PlaceHolderImg />
            )}
    </div>
)

export default UrlImage