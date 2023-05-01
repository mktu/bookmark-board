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
    const push = (path: string) => {
        onClose()
        router.push(path)
    }
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

    const login = (
        <div className='my-2 flex items-center'>
            <TextButton aria-label='Login' colorType='none' className='flex w-full items-center text-primary-main' onClick={() => {
                push('/signin')
            }}>
                <LoginIcon strokeWidth={1.5} className='mr-2 h-10 w-10 stroke-primary-main' />
                <div>ログイン</div>
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
            {login}
            {help}
            {close}
        </div>
    )
}


export default AppMenu;