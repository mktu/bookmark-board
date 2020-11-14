import React from 'react'
import styles from './index.module.scss'
type Props = {
    header: React.ReactNode,
    sidebar: React.ReactNode,
    main: React.ReactNode
}

const Layout = ({
    header,
    sidebar,
    main
}: Props) => {
    return (
        <div className={styles['app-layout']}>
            <div>{sidebar}</div>
            <div>{main}</div>
        </div>
    )
}

export default Layout;