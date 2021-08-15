import { useContext,useCallback,useState } from 'react'
import { useProfile } from '@modules/profileSlice'
import { useNotifications as useBase, useUnreadNotifications } from '@modules/notificationSlice'
import FirebaseContext from '@context/FirebaseContext'

export default function useNotifications() {
    const [writing,setWriting] = useState(false)
    const notifications = useBase()
    const unreads = useUnreadNotifications()
    const { clientService } = useContext(FirebaseContext)
    const {id} = useProfile()
    const setReadFlag = useCallback(async ()=>{
        if(writing || unreads.length === 0 || !id){
            return
        }
        setWriting(true)
        const targets = unreads.map(v=>v.id)
        await clientService.readNotifications(id, targets)
        setWriting(false)
    },[unreads,id,clientService,writing])
    return {
        notifications,
        unreads,
        setReadFlag
    }
}