import { VFC, useEffect } from 'react'
import { useLineAuth, lineLoginSettingPage } from '@hooks/useLineLogin'
import { OutlinedButton } from '@components/Common/Button'
import Presenter from './Presenter'

type Props = {
    onClose : ()=>void,
    registLineId: (line:ReturnType<typeof useLineAuth>['user'])=>void,
}

const Container: VFC<Props> = ({
    onClose,
    registLineId,
}) => {
    const { user, error, addFriendLink } = useLineAuth(lineLoginSettingPage)
    const success = user && !error
    useEffect(()=>{
        if(success){
            registLineId(user)
        }
    },[user,registLineId, success])
    const closeButton = (
        <OutlinedButton onClick={onClose}>閉じる</OutlinedButton>
    )
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