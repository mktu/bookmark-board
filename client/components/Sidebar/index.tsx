import styles from './index.module.scss'
import { useSelector } from "react-redux";
import { RootReducer } from '../../reducers'
import { User, Book, Setting, Help } from '../Common/Icon'
import { Popover } from '../Common/Popover'
import { SvgIconButton } from '../Common/Button'
import ProfileMenu from './ProfileMenu'

const Sidebar = () => {
    const sidebar = useSelector((state: RootReducer) => state.sidebar)
    return (
        <div className={`flex flex-row h-full ${sidebar ? 'w-20' : 'w-0'} bg-primary-dark transition-all duration-200 ease-in-out`}>
            <nav className="h-full w-20 items-center flex flex-col p-4">
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