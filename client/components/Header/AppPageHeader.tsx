import React, { useState, useContext } from 'react'
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames'
import styles from './index.module.scss'
import { useRouter } from 'next/router'
import { Modal } from 'react-responsive-modal';
import Book from '@components/Common/Icon/Book'
import Search from '@components/Common/Icon/Search'
import Help from '@components/Common/Icon/Help'
import User from '@components/Common/Icon/User'
import X from '@components/Common/Icon/X'
import MenuIcon from '@components/Common/Icon/Menu'
import FirebaseContext from '@context/FirebaseContext'
import { SvgIconButton, TextButton } from '@components/Common/Button'
import { useProfile } from '@modules/profileSlice'
import { HelpLink } from '@utils/constants'
import Layout from './Layout'

// only for mobile page

type DialogProps = {
    children: React.ReactChild,
    open: boolean,
    onClose: () => void
}

const Dialog: React.FC<DialogProps> = ({
    children,
    open,
    onClose
}) => {
    return (
        <Modal open={open} showCloseIcon={false} blockScroll focusTrapped={false} onClose={onClose} classNames={{
            modal: 'w-full',
        }} styles={{
            modal : {
                margin : 0
            }
        }}>
            {children}
        </Modal>
    )
}

const Menu: React.VFC<{ onClose: () => void }> = ({
    onClose
}) => {
    const router = useRouter()
    const [openProfile, setOpenProfile] = useState(false)
    const profile = useProfile()
    const { clientService } = useContext(FirebaseContext)
    const push = (path:string)=>{
        onClose()
        router.push(path)
    }

    const app = (
        <div className='my-2 flex items-center'>
            <TextButton aria-label='Open Bookmark' className='flex items-center' onClick={() => {
                push('/bookmarks')
            }}>
                <Book strokeWidth={1.5} className='w-10 h-10 stroke-primary-main mr-2' />
                <div>Bookmarkアプリ</div>
            </TextButton>
        </div>
    )

    const search = (
        <div className='mr-4 md:hidden flex items-center'>
            <TextButton aria-label='Open Search' colorType='none' className='flex items-center text-primary-main' onClick={() => {
                push('/search')
            }}>
                <Search strokeWidth={1.5} className='w-10 h-10 stroke-primary-main mr-2' />
                <div>検索</div>
            </TextButton>
        </div>
    )

    const profileMenu = (
        <div className='my-2'>
            <div className='flex items-center text-primary-main' >
                <TextButton aria-label='Login Menu' colorType='none' className='flex items-center text-primary-main' onClick={() => {
                    setOpenProfile(b => !b)
                }}>
                    <User strokeWidth={1.5} className='w-10 h-10 stroke-primary-main mr-2' />
                    <div>{profile.name}</div>

                </TextButton>
            </div>
            <ul className={`${openProfile ? 'opacity-100 h-12' : 'h-0 overflow-hidden opacity-0'} ml-4 my-2  transition-all ease-in-out duration-500 transform`}>
                <li>
                    <TextButton className='underline'
                        onClick={() => {
                            push('/profile')
                        }}>編集</TextButton>
                </li>
                <TextButton className='underline' onClick={() => {
                    clientService.logout(() => {
                        push('/signin')
                    })
                }} >ログアウト</TextButton>

            </ul>
        </div>
    )

    const help = (
        <div className='my-2 flex items-center'>
            <TextButton aria-label='How to use Bookmark' colorType='none' className='flex items-center text-primary-main' onClick={() => {
                window && window.open(HelpLink, '_blank')
            }}>
                <Help strokeWidth={1.5} className='w-10 h-10 stroke-primary-main mr-2' />
                <div>ヘルプ</div>
            </TextButton>
        </div>
    )

    const close = (
        <SvgIconButton aria-label='Close dialog' colorType='none' className='absolute top-0 right-0 flex items-center bg-primary-light opacity-75 rounded-full mr-2 border border-primary-dark p-2'
            onClick={() => {
                onClose()
            }}>
            <X strokeWidth={1} className='w-6 h-6 stroke-primary-dark' />
        </SvgIconButton>
    )

    return (
        <div className='relative'>
            {profileMenu}
            {app}
            {search}
            {help}
            {close}
        </div>
    )
}

const Header: React.VFC = () => {
    const [open, setOpen] = useState(false)
    const { ref, inView } = useInView()
    const menu = (
        <SvgIconButton aria-label='Open Search' colorType='none' className={
            classNames(inView ? styles['heroicon-button'] : 'bg-primary-light rounded-full stroke-primary-main p-2 border border-primary-main')} onClick={() => {
                setOpen(o => !o)
            }}>
            <MenuIcon strokeWidth={1.5} className='w-10 h-10' />
        </SvgIconButton>
    )

    return (
        <>
            <Layout ref={ref}>
                {menu}
            </Layout>
            <div className={`${inView ? 'h-0 overflow-hidden opacity-0' : 'opacity-75 p-2'} fixed top-0 right-0 transition-all ease-in-out duration-500 transform z-50`}>
                {menu}
            </div>
            <Dialog open={open} onClose={() => { setOpen(o => !o) }}>
                <Menu onClose={() => { setOpen(o => !o) }}/>
            </Dialog>
        </>
    )
}

export default Header;