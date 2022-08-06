import React from 'react'

type Props = {
    sidebar: React.ReactNode,
    main: React.ReactNode,
    header: React.ReactNode,
}

const Layout = ({
    sidebar,
    main,
    header
}: Props) => {
    return (
        <div className='box-border flex h-screen w-screen flex-col md:flex-row'>
            <div className='md:hidden'>{header}</div>
            <div className='hidden md:block'>{sidebar}</div>
            <div className='flex-1 md:h-full md:overflow-hidden'>{main}</div>
        </div>
    )
}

export default Layout;