import { VFC } from 'react'
import { useLineAuth, lineLoginSettingPage } from '@hooks/useLineLogin'
import { OutlinedButton } from '@components/Common/Button'
import Presenter from './Presenter'
import Loader from './Loader'

type Props = {
    onClose : ()=>void,
}

const Container: VFC<Props> = ({
    onClose,
}) => {
    const { registerStatus, error, addFriendLink } = useLineAuth(lineLoginSettingPage)
    const success = registerStatus === 'complete' && !error
    const closeButton = (
        <OutlinedButton onClick={onClose}>閉じる</OutlinedButton>
    )
    if(registerStatus === 'executing'){
        return <Loader />
    }
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