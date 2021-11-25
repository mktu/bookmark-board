import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({
    children
}: Props) => {
    return (
        <div className='w-screen h-screen'>
            {children}
        </div>
    )
}

export default Layout;