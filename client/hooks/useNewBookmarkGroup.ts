import { useState, useContext, useCallback, useMemo } from 'react'
import { useProfile } from '../modules/profileSlice'
import { useGroupsByUser } from '../modules/groupSlice'
import { MaxGroupNumber } from '../utils/constants'
import FirebaseContext from '../context/FirebaseContext'


const useNewBookmarkGroup = ()=>{
    const { clientService } = useContext(FirebaseContext)
    const [newGroup, setNewGroup] = useState('')
    const profile = useProfile()
    const groups = useGroupsByUser(profile.id)
    const error = useMemo(()=>{
        if(groups.length >= MaxGroupNumber){
            return `登録できるグループの上限(${MaxGroupNumber})を超えています.`
        }
        return ''
    },[groups])
    const submit = useCallback(() => {
        if (newGroup === '' || !profile.id || error) {
            return
        }
        clientService.addGroup(newGroup, profile.id, (id) => {
            console.log(`created ${id}.`)
            setNewGroup('')
        })
    },[newGroup,profile.id,clientService,error])
    return {
        error,
        newGroup,
        setNewGroup,
        submit,
    }
}

export default useNewBookmarkGroup