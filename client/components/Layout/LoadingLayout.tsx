import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({
    children
}: Props) => {
    return (
        <div className='w-screen h-screen flex flex-row justify-center items-center'>
            {children}
        </div>
    )
}

export default Layout;