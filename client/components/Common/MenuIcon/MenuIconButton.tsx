import styles from './index.module.scss'
import classNames from 'classnames'
import { SvgIconButton } from '@components/Common/Button'

type Props = Parameters<typeof SvgIconButton>[0]

const MenuIconButton : React.VFC<Props> = ({className, ...others}) => {
    return (
        <SvgIconButton aria-label='Notification' colorType='none' className={classNames(styles['heroicon-button'],className)} {...others} />
    )
}

export default MenuIconButton;