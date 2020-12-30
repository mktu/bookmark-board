import { useEffect, useMemo } from 'react'
import { useUsersByIds, actions } from '../../modules/usersSlice'
import { useGroupsByUser } from '../../modules/groupSlice'
import useProfileService from '../useProfileService'
import { useProfile } from '../../modules/profileSlice'
import { useDispatch } from "react-redux";

const useEditors = () => {
    const dispatch = useDispatch()
    const { id } = useProfile()
    const groups = useGroupsByUser(id)
    const bookmarkUids = useMemo(() => groups.reduce((acc,value) => {
        acc = [...acc,...value.users]
        return acc
    },[] as string[]),[groups])
    const editors = useUsersByIds(bookmarkUids).map(p => p.id)
    const profiles = useProfileService(bookmarkUids.filter(uid => !editors.includes(uid)))
    useEffect(()=>{
        dispatch(actions.upsertUsers({ users:profiles }))
        return ()=>{
            profiles.length > 0 && dispatch(actions.removeUsers({ users:profiles }))
        }
    },[profiles])
}

export default useEditors