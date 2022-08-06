import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({
    children
}: Props) => {
    return (
        <div className='flex h-screen w-screen flex-row items-center justify-center'>
            {children}
        </div>
    )
}

export default Layout;