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
        <div className='flex items-center my-2'>
            <TextButton aria-label='How to use Bookmark' colorType='none' className='flex items-center w-full text-primary-main' onClick={() => {
                window && window.open(HelpLink, '_blank')
            }}>
                <Help strokeWidth={1.5} className='mr-2 w-10 h-10 stroke-primary-main' />
                <div>ヘルプ</div>
            </TextButton>
        </div>
    )

    const login = (
        <div className='flex items-center my-2'>
            <TextButton aria-label='Login' colorType='none' className='flex items-center w-full text-primary-main' onClick={() => {
                push('/signin')
            }}>
                <LoginIcon strokeWidth={1.5} className='mr-2 w-10 h-10 stroke-primary-main' />
                <div>ログイン</div>
            </TextButton>
        </div>
    )

    const close = (
        <SvgIconButton aria-label='Close dialog' colorType='none' className='flex absolute top-0 right-0 items-center p-2 mr-2 bg-primary-light rounded-full border border-primary-dark opacity-75'
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