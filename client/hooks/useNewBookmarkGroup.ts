import { useState, useContext, useCallback, useMemo } from 'react'
import { useProfile } from '@modules/profileSlice'
import { useGroupsByUser } from '@modules/groupSlice'
import { MaxGroupNumber } from '@utils/constants'
import { defaultColors } from '@utils/color'
import FirebaseContext from '@context/FirebaseContext'

export const useNewBookmarkGroup = ()=>{
    const { clientService } = useContext(FirebaseContext)
    const addGroup = useCallback((name:string, uid:string)=>new Promise<string>((resolve)=>{
        clientService.addGroup({
            name,
            owner: uid,
            users: [uid],
            actions: [],
            colors : defaultColors
        },resolve)
    }),[clientService])
    return {
        addGroup
    }
}

const useNewBookmarkGroupInput = () => {
    const { addGroup } = useNewBookmarkGroup()
    const [newGroup, setNewGroup] = useState('')
    const profile = useProfile()
    const groups = useGroupsByUser(profile.id)
    const hasInput = Boolean(newGroup)
    const error = useMemo(() => {
        if(!hasInput){
            return ''
        }
        if (groups.length >= MaxGroupNumber) {
            return `登録できるグループの上限(${MaxGroupNumber})を超えています.`
        }
        return ''
    }, [groups,hasInput])
    const submit = useCallback(async () => {
        if (newGroup === '' || !profile.id || error) {
            return
        }
        await addGroup(newGroup,profile.id)
        setNewGroup('')
    }, [newGroup, profile.id, addGroup, error])
    return {
        error,
        newGroup,
        setNewGroup,
        submit,
    }
}

export default useNewBookmarkGroupInput