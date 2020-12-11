import { useEffect } from 'react'
import { useUserIdsByIds, actions } from '../../../modules/usersSlice'
import { useGroupsByOwner } from '../../../modules/groupSlice'
import { useRequestsByGroups } from '../../../modules/requestSlice'
import { useProfileService } from '../../../hooks'
import { useProfile } from '../../../modules/profileSlice'
import { useDispatch } from "react-redux";

const useRequestors = () => {
    const dispatch = useDispatch()
    const { id } = useProfile()
    const groups = useGroupsByOwner(id)
    const requestIds = useRequestsByGroups(groups.map(g => g.id))
    const requestSenders = requestIds.map(r => r.sender)
    const alreadyLoaded = useUserIdsByIds(requestSenders)
    const profiles = useProfileService(requestSenders.filter(uid => !alreadyLoaded.includes(uid)))
    
    useEffect(() => {
        dispatch(actions.upsertUsers({ users: profiles }))
    }, [profiles])
}

export default useRequestors