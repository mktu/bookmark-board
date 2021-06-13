import React from 'react'
import { useRouter } from 'next/router'
import Help from '@components/Common/Icon/Help'
import LoginIcon from '@components/Common/Icon/Login'
import X from '@components/Common/Icon/X'
import { SvgIconButton, TextButton } from '@components/Common/Button'
import { HelpLink } from '@utils/constants'

// only for mobile page

const AppMenu: React.VFC<{ onClose: () => void }> = ({
    onClose
}) => {
    const router = useRouter()
    const push = (path:string)=>{
        onClose()
        router.push(path)
    }
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

    const login = (
        <div className='my-2 flex items-center'>
            <TextButton aria-label='How to use Bookmark' colorType='none' className='flex items-center text-primary-main w-full' onClick={() => {
                push('/signin')
            }}>
                <LoginIcon strokeWidth={1.5} className='w-10 h-10 stroke-primary-main mr-2' />
                <div>ログイン</div>
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
            {login}
            {help}
            {close}
        </div>
    )
}


export default AppMenu;