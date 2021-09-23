import React from 'react'
import HeaderLogo from '@components/Common/Logo/Logo'
import LogoSm from '@components/Common/Icon/LogoSm'
import { ButtonBase } from '@components/Common/Button'

type Props = {
    children: React.ReactNode,
    onClickHome: ()=>void
}


const Layout = React.forwardRef<HTMLDivElement, Props>(function Layout({
    children,
    onClickHome
}, ref) {
    return (
        <div ref={ref} className="text-gray-500 bg-brand shadow-xl">
            <div className="flex flex-wrap items-center p-2">
                <ButtonBase className='hidden md:block' aria-label='Home' onClick={onClickHome}>
                    <HeaderLogo theme='light' size='sm' />
                </ButtonBase>
                <ButtonBase className='md:hidden' aria-label='Home' onClick={onClickHome}>
                    <LogoSm width={45} height={30} strokeOpacity={0.7} />
                </ButtonBase>
                <div className="ml-auto">
                    {children}
                </div>
            </div>
        </div>
    )
})

export default Layout;