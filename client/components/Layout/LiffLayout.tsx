import React from 'react'
import Logo from '@components/Common/Logo'

type Props = {
    children: React.ReactNode
}

const Layout = ({
    children
}: Props) => {
    return (
        <div className='flex flex-col justify-center items-center p-4 w-screen'>
            <Logo theme='dark' size='md' />
            <div className='mt-4 w-full'>
                {children}
            </div>
        </div>
    )
}

export default Layout;