import React from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'
import { useRouter } from 'next/router'
import { useInView } from 'react-intersection-observer';
import LoginIcon from '@components/Common/Icon/Login'
import HelpIcon from '@components/Common/Icon/Help'
import { TooltipDivContainer } from '@components/Common/Tooltip'
import { SvgIconButton, TextButton } from '@components/Common/Button'
import { HelpLink } from '@utils/constants'
import Layout from './Layout'

const WebUnauthedHeader = () => {
    const router = useRouter()
    const { ref, inView } = useInView({initialInView:true})
    const onClickLogin = () => {
        router.push('/signin')
    }
    const onClickHelp = () => {
        window && window.open(HelpLink, '_blank')
    }
    const mainRootStyle = 'mx-2'
    const sideRootStyle = 'my-2'
    const mainSvgStyle = styles['heroicon-button']

    const LoginMain: React.VFC = () => (
        <TextButton aria-label='Login' colorType='none' className={classNames(styles['heroicon-button'], 'flex items-center', mainRootStyle)} onClick={onClickLogin}>
            <LoginIcon className='w-10 h-10 stroke-primary-400' />
            <p>LOGIN</p>
        </TextButton>
    )

    const LoginSide: React.VFC = () => (
        <TooltipDivContainer content='ログイン' placement='bottom' className={sideRootStyle}>
            <SvgIconButton aria-label='Login' colorType='none' className='flex items-center' onClick={onClickLogin}>
                <LoginIcon className='w-10 h-10 stroke-primary-400' />
            </SvgIconButton>
        </TooltipDivContainer>

    )

    const Help: React.VFC<{ root?: string, svg?: string }> = ({ root, svg }) => (
        <TooltipDivContainer content='使い方' placement='bottom' className={`${root} flex items-center`}>
            <SvgIconButton aria-label='How to use Bookmark' colorType='none' className={svg} onClick={onClickHelp}>
                <HelpIcon className='w-10 h-10 stroke-primary-400'/>
            </SvgIconButton>
        </TooltipDivContainer>
    )
    return (
        <Layout ref={ref}>
            <div className='flex items-center mr-2'>
                <Help root={mainRootStyle} svg={mainSvgStyle} />
                <LoginMain />
            </div>
            <div className={`${inView ? 'h-0 overflow-hidden opacity-0' : 'opacity-100 p-2 border border-primary-400 rounded-full'} m-8 fixed top-0 right-0 transition-all ease-in-out duration-500 transform z-50`}>
                <LoginSide />
                <Help root={sideRootStyle} />
            </div>
        </Layout>
    )
}

export default WebUnauthedHeader;