import styles from './index.module.scss'
import classNames from 'classnames'
import Bell from '@components/Common/Icon/Bell'
import { PopoverDivContainer } from '@components/Common/Popover'
import { SvgIconButton } from '@components/Common/Button'
import { useUnreadNotifications } from '@modules/notificationSlice'
import { NotificationMenu } from '../../PopoverMenu'
import { CSSProperties } from 'react'

type Props = {
    className?:string
    placement:Parameters<typeof PopoverDivContainer>[0]['placement'],
    notificationPos?:Pick<CSSProperties, 'top' | 'left' | 'bottom' | 'right'>
}

const Notification : React.VFC<Props> = ({className,placement,notificationPos}) => {
    const unreads = useUnreadNotifications()
    return (
        <PopoverDivContainer
            content={<NotificationMenu />}
            placement={placement}
            className={classNames('relative',className)}
        >
            <SvgIconButton aria-label='Notification' colorType='none' className={styles['heroicon-button']} >
                <span className={`text-xs text-white bg-secondary-300 rounded-full p-1 absolute ${unreads.length === 0 && 'opacity-0'}`} style={notificationPos}>{unreads.length}</span>
                <Bell />
            </SvgIconButton>
        </PopoverDivContainer>
    )
}

export default Notification;