import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import MenuIcon from '@components/Common/Icon/Menu'
import Notification from '@components/Common/MenuIcon/Notification'
import MenuIconButton from '@components/Common/MenuIcon/MenuIconButton'
import { SvgIconButton } from '@components/Common/Button'
import Layout from './Layout'
import Dialog from './MenuCommon'

type ChildType = React.VFC<{ onClose: () => void }>

const MobileHeader: React.VFC<{ Child: ChildType, authed: boolean, fixed?: boolean }> = ({ Child, authed, fixed }) => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const onClickHome = () => {
        if (authed) {
            router.push('/bookmarks')
        } else {
            router.push('/')
        }
    }
    const { ref, inView } = useInView({ initialInView: true })
    const onOpen = () => {
        setOpen(o => !o)
    }
    const menu = (
        <MenuIconButton aria-label='Open Menu' colorType='none' onClick={onOpen}>
            <MenuIcon strokeWidth={1.5} className='h-10 w-10' />
        </MenuIconButton>
    )
    const mobileMenu = (
        <SvgIconButton aria-label='Open Menu' colorType='none' className={'rounded-full border border-primary-main bg-primary-light stroke-primary-main p-2'} onClick={onOpen}>
            <MenuIcon strokeWidth={1.5} className='h-10 w-10' />
        </SvgIconButton>
    )
    return (
        <>
            <Layout ref={ref} onClickHome={onClickHome}>
                <div className='flex items-center'>
                    {authed && (
                        <Notification className='mr-2' placement='left' notificationPos={{ left: 0 }} />
                    )}
                    {menu}
                </div>
            </Layout>
            {fixed && (
                <div className={`${inView ? 'h-0 overflow-hidden opacity-0' : 'p-2 opacity-75'} fixed top-0 right-0 z-50 transition-all duration-500 ease-in-out`}>
                    {mobileMenu}
                </div>
            )}
            <Dialog open={open} onClose={() => { setOpen(o => !o) }}>
                <Child onClose={() => { setOpen(o => !o) }} />
            </Dialog>
        </>
    )
}

export default MobileHeader;