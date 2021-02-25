import React from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'
import { useRouter } from 'next/router'
import HeaderLogo from '../Common/Logo/Logo'
import Book from '../Common/Icon/Book'
import Login from '../Common/Icon/Login'
import User from '../Common/Icon/User'
import { Popover } from '../Common/Popover'
import { TooltipDivContainer } from '../Common/Tooltip'
import { ProfileMenu } from '../PopoverMenu'
import { SvgIconButton, ButtonBase, TextButton } from '../Common/Button'
import { useProfile } from '../../modules/profileSlice'


const Header = () => {
    const router = useRouter()
    const profile = useProfile()
    return (
        <header className="text-gray-500 bg-brand body-font">
            <div className="flex flex-wrap p-2 items-center">
                <ButtonBase aria-label='Home' onClick={() => {
                    router.push('/')
                }}>
                    <HeaderLogo theme='light' size='sm'/>
                </ButtonBase>
                <div className="ml-auto">
                    {profile.id ? (
                        <div className='flex flex-row items-center mr-2'>
                            <TooltipDivContainer content='Bookmarkアプリ' placement='bottom' className='mr-4'>
                                <SvgIconButton aria-label='Open Bookmark' colorType='none' className={styles['heroicon-button']} onClick={() => {
                                    router.push('/bookmarks')
                                }}>
                                    <Book />
                                </SvgIconButton>
                            </TooltipDivContainer>
                            <Popover
                                placement='bottom-end'
                                content={<ProfileMenu />}>
                                <div>
                                    <SvgIconButton aria-label='Login Menu' colorType='none' className={styles['heroicon-button']}>
                                        <User />
                                    </SvgIconButton>
                                </div>
                            </Popover>
                        </div>
                    ) : (
                            <TextButton colorType='none' className={classNames(styles['heroicon-button'], 'flex items-center p-1')} onClick={() => {
                                router.push('/signin')
                            }}>
                                <Login className='block mr-2' />
                                <p>LOGIN</p>
                            </TextButton>
                        )}
                </div>
            </div>
        </header>
    )
}

export default Header;