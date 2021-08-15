import { useEffect,useContext } from 'react'
import { useProfile } from '@modules/profileSlice'
import { actions } from '@modules/notificationSlice'
import FirebaseContext from '@context/FirebaseContext'
import { useDispatch } from 'react-redux'

export default function useNotifications() {
    const { clientService } = useContext(FirebaseContext)
    const { id } = useProfile()
    const dispatch = useDispatch()

    useEffect(()=>{
        if(!id){
            return
        }
        const unsub = clientService.listenNotifications(id, (notifications) => {
            dispatch(actions.upsert(notifications))
        }, (notifications) => {
            dispatch(actions.modify(notifications))
        }, (notifications) => {
            dispatch(actions.delete(notifications))
        })
        return ()=>{
            unsub()
        }
    },[id,clientService,dispatch])

}