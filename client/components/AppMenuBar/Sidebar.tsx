import styles from './index.module.scss'
import { useRouter } from 'next/router'
import { User, Book, Help } from '../Common/Icon'
import { Popover } from '../Common/Popover'
import { SvgIconButton } from '../Common/Button'
import {ProfileMenu} from '../PopoverMenu'

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
                        <div className='mb-8'>
                            <SvgIconButton aria-label='Profile' colorType='none' className={styles['heroicon-button']}>
                                <User />
                            </SvgIconButton>
                        </div>
                    </Popover>

                    <SvgIconButton aria-label='Bookmark' colorType='none' className={styles['heroicon-button']} onClick={()=>{
                        router.push('/bookmarks')
                    }}>
                        <Book />
                    </SvgIconButton>
                </div>
                <div className='mt-auto'>
                    <SvgIconButton aria-label='Help' colorType='none' className={styles['heroicon-button']}>
                        <Help />
                    </SvgIconButton>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar;