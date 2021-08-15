import { useRouter } from 'next/router'
import User from '@components/Common/Icon/User'
import Book from '@components/Common/Icon/Book'
import Help from '@components/Common/Icon/Help'
import Search from '@components/Common/Icon/Search'
import { Popover } from '@components/Common/Popover'
import { ProfileMenu } from '../PopoverMenu'
import Notification from '@components/Common/MenuIcon/Notification'
import MenuIconButton from '@components/Common/MenuIcon/MenuIconButton'
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
                            <MenuIconButton aria-label='Profile' colorType='none' className='mb-6'>
                                <User />
                            </MenuIconButton>
                        </div>
                    </Popover>
                    <MenuIconButton aria-label='Bookmark' colorType='none' className='mb-6' onClick={() => {
                        router.push('/bookmarks')
                    }}>
                        <Book />
                    </MenuIconButton>
                    <MenuIconButton aria-label='Search' colorType='none' className='mb-6' onClick={() => {
                        router.push('/search')
                    }}>
                        <Search />
                    </MenuIconButton>
                </div>
                <div className='mt-auto'>
                    <Notification className='mb-6' placement='auto-end' notificationPos={{right : '10px', top : '-10px'}}/>
                    <MenuIconButton aria-label='Help' colorType='none' className='mb-6' onClick={() => {
                        window && window.open(HelpLink, '_blank')
                    }}>
                        <Help />
                    </MenuIconButton>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar;