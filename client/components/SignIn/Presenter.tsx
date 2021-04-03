import React from 'react'

type Props = {
    welcome : React.ReactNode,
    webLogin : React.ReactNode,
    mobileLogin : React.ReactNode,
}

const Presenter = ({
    welcome,
    webLogin,
    mobileLogin
}: Props) => {
    return (
        <div className='w-screen h-screen flex flex-col md:flex-row'>
            <div className='hidden md:block w-full md:w-7/12 h-full'>
                {welcome}
            </div>
            <div className='hidden md:block w-full md:w-5/12 h-full'>
                {webLogin}
            </div>
            <div className='md:hidden w-full md:w-5/12 h-full'>
                {mobileLogin}
            </div>
        </div>
    )
}

export default Presenter;