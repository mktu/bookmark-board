import React from 'react'
import Logo from '@components/Common/Logo'

type Props = {
    children: React.ReactNode
}

const Layout = ({
    children
}: Props) => {
    return (
        <div className='flex w-screen flex-col items-center justify-center p-4'>
            <Logo theme='dark' size='md' />
            <div className='mt-4 w-full'>
                {children}
            </div>
        </div>
    )
}

export default Layout;