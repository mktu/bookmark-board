import React from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'
import { useRouter } from 'next/router'
import HeaderLogo from '@components/Common/Logo/Logo'
import Book from '@components/Common/Icon/Book'
import Login from '@components/Common/Icon/Login'
import Search from '@components/Common/Icon/Search'
import LogoSm from '@components/Common/Icon/LogoSm'
import User from '@components/Common/Icon/User'
import { PopoverDivContainer } from '@components/Common/Popover'
import { TooltipDivContainer } from '@components/Common/Tooltip'
import { ProfileMenu } from '@components/PopoverMenu'
import { SvgIconButton, ButtonBase, TextButton } from '@components/Common/Button'
import { useProfile } from '@modules/profileSlice'


const Header = () => {
    const router = useRouter()
    const profile = useProfile()

    const search = (
        <TooltipDivContainer content='検索' placement='bottom' className='mr-4 flex items-center'>
            <SvgIconButton aria-label='Open Search' colorType='none' className={styles['heroicon-button']} onClick={() => {
                router.push('/public-search')
            }}>
                <Search />
            </SvgIconButton>
        </TooltipDivContainer>
    )

    const app = (
        <TooltipDivContainer content='Bookmarkアプリ' placement='bottom' className='mr-4'>
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
            content={<ProfileMenu />}>
            <div>
                <SvgIconButton aria-label='Login Menu' colorType='none' className={styles['heroicon-button']}>
                    <User />
                </SvgIconButton>
            </div>
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
    return (
        <header className="text-gray-500 bg-brand body-font">
            <div className="flex flex-wrap p-2 items-center">
                <ButtonBase className='hidden md:block' aria-label='Home' onClick={() => {
                    router.push('/')
                }}>
                    <HeaderLogo theme='light' size='sm' />
                </ButtonBase>
                <ButtonBase className='md:hidden' aria-label='Home' onClick={() => {
                    router.push('/')
                }}>
                    <LogoSm width={45} height={30} strokeOpacity={0.7} />
                </ButtonBase>
                <div className="ml-auto">
                    {profile.id ? (
                        <div className='flex items-center mr-2'>
                            {search}
                            {app}
                            {profileMenu}
                        </div>
                    ) : (
                        <div className='flex items-center mr-2'>
                            {search}
                            {login}
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;