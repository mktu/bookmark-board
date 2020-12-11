import React from 'react'
import styles from './index.module.scss'
type Props = {
    sidebar: React.ReactNode,
    main: React.ReactNode
}

const Layout = ({
    sidebar,
    main
}: Props) => {
    return (
        <div className={styles['app-layout']}>
            <div>{sidebar}</div>
            <div className=' overflow-hidden'>{main}</div>
        </div>
    )
}

export default Layout;