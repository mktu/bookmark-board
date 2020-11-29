import React from 'react'
import styles from './index.module.scss'
type Props = {
    header: React.ReactNode,
    main: React.ReactNode
}

const Layout = ({
    header,
    main
}: Props) => {
    return (
        <div className='w-screen'>
            <div className='w-full'>{header}</div>
            <div>{main}</div>
        </div>
    )
}

export default Layout;