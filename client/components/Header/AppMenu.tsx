import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Book from '@components/Common/Icon/Book'
import Search from '@components/Common/Icon/Search'
import Help from '@components/Common/Icon/Help'
import Logout from '@components/Common/Icon/Logout'
import Setting from '@components/Common/Icon/Setting'
import X from '@components/Common/Icon/X'
import FirebaseContext from '@context/FirebaseContext'
import { SvgIconButton, TextButton } from '@components/Common/Button'
import { useProfile } from '@modules/profileSlice'
import { HelpLink } from '@utils/constants'
import Avatar from '@components/Common/Avatar/NextImage'
import Initial from '@components/Common/Avatar/Initial'

// only for mobile page


const AppMenu: React.VFC<{ onClose: () => void }> = ({
    onClose
}) => {
    const router = useRouter()
    const profile = useProfile()
    const { clientService } = useContext(FirebaseContext)
    const push = (path: string) => {
        onClose()
        router.push(path)
    }

    const app = (
        <div className='my-2 flex items-center'>
            <TextButton aria-label='Open Bookmark' className='flex w-full items-center' onClick={() => {
                push('/bookmarks')
            }}>
                <Book strokeWidth={1.5} className='mr-2 h-10 w-10 stroke-primary-main' />
                <div>Bookmarkアプリ</div>
            </TextButton>
        </div>
    )

    const search = (
        <div className='mr-4 flex items-center'>
            <TextButton aria-label='Open Search' colorType='none' className='flex w-full items-center text-primary-main' onClick={() => {
                push('/search')
            }}>
                <Search strokeWidth={1.5} className='mr-2 h-10 w-10 stroke-primary-main' />
                <div>検索</div>
            </TextButton>
        </div>
    )

    const account = (
        <div className='flex items-center font-bold text-primary-main' >
            <Avatar
                src={profile.image}
                width={42}
                height={42}
                name={profile.name}
                fallback={<Initial
                    width={32}
                    height={32}
                    name={profile.name}
                />}
            />
            <div className='ml-2'>{profile.name}</div>
        </div>
    )

    const profileMenu = (
        <div className='my-2'>
            <div className='flex items-center text-primary-main' >
                <TextButton aria-label='Login Menu' colorType='none' className='flex w-full items-center text-primary-main' onClick={() => {
                    push('/profile')
                }}>
                    <Setting strokeWidth={1.5} className='mr-2 h-10 w-10 stroke-primary-main' />
                    <div>アカウント設定</div>
                </TextButton>
            </div>
        </div>
    )

    const help = (
        <div className='my-2 flex items-center'>
            <TextButton aria-label='How to use Bookmark' colorType='none' className='flex w-full items-center text-primary-main' onClick={() => {
                window && window.open(HelpLink, '_blank')
            }}>
                <Help strokeWidth={1.5} className='mr-2 h-10 w-10 stroke-primary-main' />
                <div>ヘルプ</div>
            </TextButton>
        </div>
    )

    const logout = (
        <div className='flex items-center'>
            <TextButton aria-label='Logout' colorType='none' className='flex w-full items-center text-primary-main' onClick={() => {
                clientService.logout(() => {
                    push('/signin')
                })
            }}>
                <Logout strokeWidth={1.5} className='mr-2 h-10 w-10 stroke-primary-main' />
                <div>ログアウト</div>
            </TextButton>
        </div>
    )

    const close = (
        <SvgIconButton aria-label='Close dialog' colorType='none' className='absolute right-0 top-0 mr-2 flex items-center rounded-full border border-primary-dark bg-primary-light p-2 opacity-75'
            onClick={() => {
                onClose()

            }}>
            <X strokeWidth={1} className='h-6 w-6 stroke-primary-dark' />
        </SvgIconButton>
    )

    return (
        <div className='relative'>
            {account}
            <div className='px-4 pt-2'>
                {profileMenu}
                {app}
                {search}
                {help}
                {logout}
            </div>
            {close}
        </div>
    )
}



export default AppMenu;