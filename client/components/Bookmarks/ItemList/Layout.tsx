import React from 'react'
import styles from './index.module.scss'

type Props = {
    header: React.ReactNode,
    contents: React.ReactNode,
}
const Layout: React.FC<Props> = ({
    header,
    contents
}) => {
    return (
        <div className={styles['itemlist-layout']}>
            <div>{header}</div>
            <div>{contents}</div>
        </div>
    )
}

export default Layout