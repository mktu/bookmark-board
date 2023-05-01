import React from 'react'
import { useRouter } from 'next/router'
import { useInView } from 'react-intersection-observer'
import styles from './index.module.scss'
import { ProfileMenu } from '@components/PopoverMenu'
import { PopoverDivContainer } from '@components/Common/Popover'
import { TooltipDivContainer } from '@components/Common/Tooltip'
import Book from '@components/Common/Icon/Book'
import SearchIcon from '@components/Common/Icon/Search'
import HelpIcon from '@components/Common/Icon/Help'
import User from '@components/Common/Icon/User'
import { SvgIconButton } from '@components/Common/Button'
import { HelpLink } from '@utils/constants'
import Layout from './Layout'


const Header: React.VFC = () => {
    const { ref, inView } = useInView({ initialInView: true })
    const router = useRouter()
    const push = (path: string) => {
        router.push(path)
    }
    const onClickBookmark = () => { push('/bookmarks') }
    const onClickSearch = () => { push('/search') }
    const onClickHelp = () => { window && window.open(HelpLink, '_blank') }
    const mainRootStyle = 'mx-2'
    const sideRootStyle = 'my-2'
    const mainSvgStyle = styles['heroicon-button']

    const App: React.VFC<{ root?: string, svg?: string }> = ({ root, svg }) => (
        <TooltipDivContainer content='Bookmarkアプリ' placement='bottom' className={`${root} flex items-center`}>
            <SvgIconButton aria-label='Open Bookmark' colorType='none' className={svg} onClick={onClickBookmark}>
                <Book className='h-10 w-10 stroke-primary-400' />
            </SvgIconButton>
        </TooltipDivContainer>
    )

    const Profile: React.VFC<{ root?: string, svg?: string }> = ({ root, svg }) => (
        <PopoverDivContainer
            placement='bottom-end'
            className={`${root} flex items-center`}
            content={<ProfileMenu />}>
            <TooltipDivContainer content='プロファイル' placement='bottom' className={`flex items-center`}>
                <SvgIconButton aria-label='Login Menu' colorType='none' className={svg}>
                    <User className='h-10 w-10 stroke-primary-400' />
                </SvgIconButton>
            </TooltipDivContainer>

        </PopoverDivContainer>
    )

    const Search: React.VFC<{ root?: string, svg?: string }> = ({ root, svg }) => (
        <TooltipDivContainer content='検索' placement='bottom' className={`${root} flex items-center`}>
            <SvgIconButton aria-label='Open Search' colorType='none' className={svg} onClick={onClickSearch}>
                <SearchIcon strokeWidth={1.5} className='h-10 w-10 stroke-primary-400' />
            </SvgIconButton>
        </TooltipDivContainer>
    )

    const Help: React.VFC<{ root?: string, svg?: string }> = ({ root, svg }) => (
        <TooltipDivContainer content='使い方' placement='bottom' className={`${root} flex items-center`}>
            <SvgIconButton aria-label='How to use Bookmark' colorType='none' className={svg} onClick={onClickHelp}>
                <HelpIcon className='h-10 w-10 stroke-primary-400' />
            </SvgIconButton>
        </TooltipDivContainer>
    )

    return (
        <>
            <Layout ref={ref} onClickHome={onClickBookmark}>
                <div className='flex items-center'>
                    <App root={mainRootStyle} svg={mainSvgStyle} />
                    <Search root={mainRootStyle} svg={mainSvgStyle} />
                    <Help root={mainRootStyle} svg={mainSvgStyle} />
                    <Profile root={mainRootStyle} svg={mainSvgStyle} />
                </div>
            </Layout>
            <div className={`${inView ? 'h-0 overflow-hidden opacity-0' : 'rounded-full border border-primary-400 p-2 opacity-100 '} fixed right-0 top-0 z-50 m-8 transition-all duration-500 ease-in-out`}>
                <App root={sideRootStyle} />
                <Search root={sideRootStyle} />
                <Help root={sideRootStyle} />
                <Profile root={sideRootStyle} />
            </div>

        </>
    )
}

export default Header;