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
        <div className='box-border w-screen h-screen flex flex-col md:flex-row'>
            <div className='md:hidden'>{header}</div>
            <div className='hidden md:block'>{sidebar}</div>
            <div className='overflow-hidden flex-1 h-full'>{main}</div>
        </div>
    )
}

export default Layout;