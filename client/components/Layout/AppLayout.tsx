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
        <div className='box-border w-screen h-screen md:flex'>
            <div className='md:hidden'>{header}</div>
            <div className='hidden md:block'>{sidebar}</div>
            <div className='overflow-hidden md:flex-1'>{main}</div>
        </div>
    )
}

export default Layout;