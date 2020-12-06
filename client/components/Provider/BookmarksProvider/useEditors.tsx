import { useEffect, useMemo } from 'react'
import { useEditorsByIds, actions } from '../../../modules/editorsSlice'
import { useGroupsByUser } from '../../../modules/groupSlice'
import { useProfileService } from '../../../hooks'
import { useProfile } from '../../../modules/profileSlice'
import { useDispatch } from "react-redux";

const useEditors = () => {
    const dispatch = useDispatch()
    const { id } = useProfile()
    const groups = useGroupsByUser(id)
    const bookmarkUids = useMemo(() => groups.reduce((acc,value) => {
        acc = [...acc,...value.users]
        return acc
    },[] as string[]),[groups])
    const editors = useEditorsByIds(bookmarkUids).map(p => p.id)
    const profiles = useProfileService(bookmarkUids.filter(uid => !editors.includes(uid)))
    useEffect(()=>{
        dispatch(actions.addEditors({ editors:profiles }))
    },[profiles])
}

export default useEditors