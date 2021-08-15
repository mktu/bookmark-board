import React from 'react'
import { useRouter } from 'next/router'
import HeaderLogo from '@components/Common/Logo/Logo'
import LogoSm from '@components/Common/Icon/LogoSm'
import { ButtonBase } from '@components/Common/Button'

type Props = {
    children: React.ReactNode
}


const Layout = React.forwardRef<HTMLDivElement, Props>(function Layout({
    children
}, ref) {
    const router = useRouter()
    return (
        <div ref={ref} className="text-gray-500 bg-brand body-font shadow-xl">
            <div className="flex flex-wrap p-2 items-center">
                <ButtonBase className='hidden md:block' aria-label='Home' onClick={() => {
                    router.push('/')
                }}>
                    <HeaderLogo theme='light' size='sm' />
                </ButtonBase>
                <ButtonBase className='md:hidden' aria-label='Home' onClick={() => {
                    router.push('/bookmarks')
                }}>
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