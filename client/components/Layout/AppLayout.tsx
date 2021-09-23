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
        <div className='box-border flex flex-col md:flex-row w-screen h-screen'>
            <div className='md:hidden'>{header}</div>
            <div className='hidden md:block'>{sidebar}</div>
            <div className='md:overflow-hidden flex-1 md:h-full'>{main}</div>
        </div>
    )
}

export default Layout;