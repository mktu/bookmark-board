import { useState, useContext, useCallback, useMemo } from 'react'
import { toast } from 'react-toastify'
import { useProfile } from '@modules/profileSlice'
import { useGroupsByUser } from '@modules/groupSlice'
import { MaxGroupNumber } from '@utils/constants'
import { defaultColors } from '@utils/color'
import FirebaseContext from '@context/FirebaseContext'

export const useNewBookmarkGroup = ()=>{
    const { clientService } = useContext(FirebaseContext)
    const addGroup = useCallback((name:string, uid:string, description?:string)=>new Promise<string>((resolve)=>{
        clientService.addGroup({
            name,
            owner: uid,
            description : description || '',
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
    const [description, setDescription] = useState('')
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
        await addGroup(newGroup,profile.id, description)
        setNewGroup('')
        toast.success('グループを追加しました.')
    }, [newGroup, profile.id, addGroup, error, description])
    return {
        error,
        newGroup,
        setNewGroup,
        description, 
        setDescription,
        submit,
    }
}

export default useNewBookmarkGroupInput