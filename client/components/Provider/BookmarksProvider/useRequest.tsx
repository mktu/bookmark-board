import {useEffect,useRef, useCallback, useContext} from 'react'
import { useDispatch } from "react-redux";
import FirebaseContext from '../../../context/FirebaseContext'
import { actions } from '../../../modules/requestSlice'

const useRequests = ()=>{
    const dispatch = useDispatch()
    const {clientService} = useContext(FirebaseContext)
    type Unsubscribe = ReturnType<typeof clientService.listenRequest>
    const unsubscribes = useRef<{[key:string]:Unsubscribe}>({})
    const onLoad = useCallback((groupId, owner)=>{
        if(!owner) return
        const unsub = clientService.listenRequest({
            groupId,
            onAdded: (requests)=>{
                dispatch(actions.upsert(requests))
            }, 
            onModified: (requests)=>{
                dispatch(actions.modify(requests))
            }, 
            onDeleted: (requests)=>[
                dispatch(actions.delete(requests))
            ], 
            status : 'requesting'
        })
        unsubscribes.current[groupId] = unsub
    },[clientService])
    const onUnload = useCallback((groupId, owner)=>{
        if(!owner) return
        unsubscribes.current[groupId] && 
        unsubscribes.current[groupId]()
        delete unsubscribes.current[groupId]
    },[])
    useEffect(()=>{
        return ()=>{
            for(const unsub of Object.values(unsubscribes.current)){
                unsub()
            }
            unsubscribes.current = {}
        }
    },[])
    return {
        onLoad,
        onUnload
    }
}

export default useRequests