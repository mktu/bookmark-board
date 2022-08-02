import React from 'react'

type Props = {
    welcome: React.ReactNode,
    webLogin: React.ReactNode,
    mobileLogin: React.ReactNode,
}

const Presenter = ({
    welcome,
    webLogin,
    mobileLogin
}: Props) => {
    return (
        <div className='flex h-screen w-screen flex-col md:flex-row'>
            <div className='hidden h-full w-full md:block md:w-7/12'>
                {welcome}
            </div>
            <div className='hidden h-full w-full md:block md:w-5/12'>
                {webLogin}
            </div>
            <div className='h-full w-full md:hidden md:w-5/12'>
                {mobileLogin}
            </div>
        </div>
    )
}

export default Presenter;