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
        <div className='box-border flex flex-col w-screen h-screen md:flex-row'>
            <div className='md:hidden'>{header}</div>
            <div className='hidden md:block'>{sidebar}</div>
            <div className='flex-1 md:overflow-hidden md:h-full'>{main}</div>
        </div>
    )
}

export default Layout;