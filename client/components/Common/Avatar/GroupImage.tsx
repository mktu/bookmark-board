import React from 'react'
import styles from './index.module.scss'
import FolderOpen from '../Icon/FolderOpen'

type Props = {
    src?: string,
    width?: string,
    height?: string
}
const GroupImage: React.FC<Props> = ({
    src,
    width,
    height
}) => (
        <div className={styles['avatar-wrapper']} style={{
            width,
            height
        }}>
            {src ? (
                <img alt='Group' src={src} width={width} height={height} className={styles['avatar-image']} />
            ) : (
                    <FolderOpen className='stroke-primary-main ' style={{
                        width,
                        height
                    }} />
                )}
        </div>
    )

export default GroupImage