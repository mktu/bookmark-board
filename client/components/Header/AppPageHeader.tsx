import React from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'
import { useRouter } from 'next/router'
import Book from '@components/Common/Icon/Book'
import Search from '@components/Common/Icon/Search'
import Help from '@components/Common/Icon/Help'
import User from '@components/Common/Icon/User'
import { PopoverDivContainer } from '@components/Common/Popover'
import { TooltipDivContainer } from '@components/Common/Tooltip'
import { ProfileMenu } from '@components/PopoverMenu'
import { SvgIconButton } from '@components/Common/Button'
import { useProfile } from '@modules/profileSlice'
import { HelpLink } from '@utils/constants'
import Layout from './Layout'

const Header = () => {
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

    const search = (
        <TooltipDivContainer content='検索' placement='bottom' className='mr-4 md:hidden flex items-center'>
            <>
                {/* <SvgIconButton aria-label='Open Search' colorType='none' className={
                    classNames(styles['heroicon-button'], 'hidden md:block')} onClick={() => {
                        router.push('/public-search')
                    }}>
                    <Search />
                </SvgIconButton> */}
                <SvgIconButton aria-label='Open Search' colorType='none' className={
                    classNames(styles['heroicon-button'])} onClick={() => {
                        router.push('/search')
                    }}>
                    <Search />
                </SvgIconButton>
            </>
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
                    {search}
                    {app}
                    {profileMenu}
                </div>
            ) : (
                <div />
            )}
        </Layout>
    )
}

export default Header;