import styles from './index.module.scss'
import classNames from 'classnames'
import Bell from '@components/Common/Icon/Bell'
import { PopoverDivContainer } from '@components/Common/Popover'
import { SvgIconButton } from '@components/Common/Button'
import { useUnreadNotifications } from '@modules/notificationSlice'
import { NotificationMenu } from '../../PopoverMenu'

type Props = {
    className?:string
}

const Notification : React.VFC<Props> = ({className}) => {
    const unreads = useUnreadNotifications()
    return (
        <PopoverDivContainer
            content={<NotificationMenu />}
            placement='auto-end'
            className={classNames('relative',className)}
        >
            <SvgIconButton aria-label='Notification' colorType='none' className={styles['heroicon-button']} >
                <span className={`text-xs text-white bg-secondary-300 rounded-full p-1 absolute ${unreads.length === 0 && 'opacity-0'}`} style={{ right: '10px', top: '-10px' }}>{unreads.length}</span>
                <Bell />
            </SvgIconButton>
        </PopoverDivContainer>
    )
}

export default Notification;