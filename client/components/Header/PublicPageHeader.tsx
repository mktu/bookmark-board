import React from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'
import { useRouter } from 'next/router'
import Book from '@components/Common/Icon/Book'
import Login from '@components/Common/Icon/Login'
import Help from '@components/Common/Icon/Help'
import User from '@components/Common/Icon/User'
import { PopoverDivContainer } from '@components/Common/Popover'
import { TooltipDivContainer } from '@components/Common/Tooltip'
import { ProfileMenu } from '@components/PopoverMenu'
import { SvgIconButton, TextButton } from '@components/Common/Button'
import { useProfile } from '@modules/profileSlice'
import { HelpLink } from '@utils/constants'
import Layout from './Layout'

const PublicPageHeader = () => {
    const router = useRouter()
    const profile = useProfile()

    const app = (
        <TooltipDivContainer content='Bookmarkアプリ' placement='bottom' className='mr-4 flex items-center'>
            <SvgIconButton aria-label='Open Bookmark' colorType='none' className={styles['heroicon-button']} onClick={() => {
                router.push('/bookmarks')
            }}>
                <Book />
            </SvgIconButton>
        </TooltipDivContainer>
    )

    const profileMenu = (
        <PopoverDivContainer
            placement='bottom-end'
            className='flex items-center'
            content={<ProfileMenu />}>
            <SvgIconButton aria-label='Login Menu' colorType='none' className={styles['heroicon-button']}>
                <User />
            </SvgIconButton>
        </PopoverDivContainer>
    )

    const login = (
        <TextButton colorType='none' className={classNames(styles['heroicon-button'], 'flex items-center')} onClick={() => {
            router.push('/signin')
        }}>
            <Login className='block mr-2' />
            <p>LOGIN</p>
        </TextButton>
    )

    const help = (
        <TooltipDivContainer content='使い方' placement='bottom' className='mr-4 flex items-center'>
            <SvgIconButton aria-label='How to use Bookmark' colorType='none' className={styles['heroicon-button']} onClick={() => {
                window && window.open(HelpLink, '_blank')
            }}>
                <Help />
            </SvgIconButton>
        </TooltipDivContainer>
    )
    return (
        <Layout>
            {profile.id ? (
                <div className='flex items-center mr-2'>
                    {help}
                    {app}
                    {profileMenu}
                </div>
            ) : (
                <div className='flex items-center mr-2'>
                    {help}
                    {login}
                </div>
            )}
        </Layout>
    )
}

export default PublicPageHeader;