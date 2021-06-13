import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Book from '@components/Common/Icon/Book'
import Search from '@components/Common/Icon/Search'
import Help from '@components/Common/Icon/Help'
import User from '@components/Common/Icon/User'
import X from '@components/Common/Icon/X'
import FirebaseContext from '@context/FirebaseContext'
import { SvgIconButton, TextButton } from '@components/Common/Button'
import { useProfile } from '@modules/profileSlice'
import { HelpLink } from '@utils/constants'

// only for mobile page


const AppMenu: React.VFC<{ onClose: () => void }> = ({
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
            <TextButton aria-label='Open Bookmark' className='flex items-center w-full' onClick={() => {
                push('/bookmarks')
            }}>
                <Book strokeWidth={1.5} className='w-10 h-10 stroke-primary-main mr-2' />
                <div>Bookmarkアプリ</div>
            </TextButton>
        </div>
    )

    const search = (
        <div className='mr-4 flex items-center'>
            <TextButton aria-label='Open Search' colorType='none' className='flex items-center text-primary-main w-full' onClick={() => {
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
                <TextButton aria-label='Login Menu' colorType='none' className='flex items-center text-primary-main w-full' onClick={() => {
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
            <TextButton aria-label='How to use Bookmark' colorType='none' className='flex items-center text-primary-main w-full' onClick={() => {
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



export default AppMenu;