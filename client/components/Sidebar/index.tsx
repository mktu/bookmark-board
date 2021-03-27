import styles from './index.module.scss'
import { useRouter } from 'next/router'
import { User, Book, Help, Search } from '../Common/Icon'
import { Popover } from '../Common/Popover'
import { SvgIconButton } from '../Common/Button'
import { ProfileMenu } from '../PopoverMenu'
import { HelpLink } from '@utils/constants'

const Sidebar = () => {
    const router = useRouter()
    return (
        <div className={`flex flex-row h-full bg-primary-dark`}>
            <nav className="h-full items-center flex flex-col p-4">
                <div>
                    <Popover
                        content={<ProfileMenu />}
                        placement='auto'
                    >
                        <div>
                            <SvgIconButton aria-label='Profile' colorType='none' className={styles['heroicon-button']}>
                                <User />
                            </SvgIconButton>
                        </div>
                    </Popover>
                    <SvgIconButton aria-label='Bookmark' colorType='none' className={styles['heroicon-button']} onClick={() => {
                        router.push('/bookmarks')
                    }}>
                        <Book />
                    </SvgIconButton>
                    <SvgIconButton aria-label='Search' colorType='none' className={styles['heroicon-button']} onClick={() => {
                        router.push('/search')
                    }}>
                        <Search />
                    </SvgIconButton>
                </div>
                <div className='mt-auto'>
                    <SvgIconButton aria-label='Help' colorType='none' className={styles['heroicon-button']} onClick={() => {
                        window && window.open(HelpLink, '_blank')
                    }}>
                        <Help />
                    </SvgIconButton>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar;