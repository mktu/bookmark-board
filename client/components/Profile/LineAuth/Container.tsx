import { VFC } from 'react'
import { useLineAuth } from '@hooks/useLineLogin'
import { OutlinedButton } from '@components/Common/Button'
import Presenter from './Presenter'

type Props = {
    onClose : ()=>void
}

const Container: VFC<Props> = ({
    onClose
}) => {
    const { userId, error, addFriendLink } = useLineAuth()
    const closeButton = (
        <OutlinedButton onClick={onClose}>閉じる</OutlinedButton>
    )
    const success = userId && !error

    return (
        <Presenter {...{
            success,
            error,
            closeButton,
            addFriendLink
        }} />
    )
}

export default Container