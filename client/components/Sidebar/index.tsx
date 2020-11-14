import styles from './index.module.scss'
import { User, Book, Setting, Help } from '../Common/Icon'
import { Popover } from '../Common/Popover'
import { SvgIconButton } from '../Common/Button'
import ProfileMenu from './ProfileMenu'

const Sidebar = () => {
    return (
        <div className={`flex flex-row h-full bg-primary-dark`}>
            <nav className="h-full items-center flex flex-col p-4">
                <div>
                    <Popover
                        content={<ProfileMenu />}
                        placement='auto'
                    >
                        <div className='mb-8'>
                            <SvgIconButton variant='inherit' className={styles['heroicon-button']}>
                                <User />
                            </SvgIconButton>
                        </div>
                    </Popover>

                    <SvgIconButton variant='inherit' className={styles['heroicon-button']}>
                        <Book />
                    </SvgIconButton>
                </div>
                <div className='mt-auto'>
                    <SvgIconButton variant='inherit' className={styles['heroicon-button']}>
                        <Setting />
                    </SvgIconButton>
                    <SvgIconButton variant='inherit' className={styles['heroicon-button']}>
                        <Help />
                    </SvgIconButton>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar;