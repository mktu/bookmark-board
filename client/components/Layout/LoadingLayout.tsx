import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({
    children
}: Props) => {
    return (
        <div className='flex flex-row justify-center items-center w-screen h-screen'>
            {children}
        </div>
    )
}

export default Layout;