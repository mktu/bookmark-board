import { useEffect, useContext, useState, useMemo } from 'react'
import FirebaseContext from '../context/FirebaseContext'
import { createInitialEntityState, upsertMany, updateMany, deleteMany } from './entityGenerator'

const getRequestStatus : (request?:BookmarkRequest)=> BookmarkRequest['status'] | 'none' = (request) => {
    if(!request){
        return 'none'
    }
    return request.status
}

const useRequestListener = (groupId:string) => {
    const [requestState,setRequestState] = useState(createInitialEntityState<BookmarkRequest>())
    const [status,setStatus] = useState<LoadStatus['status']>('loading')
    const {clientService} = useContext(FirebaseContext)
    useEffect(()=>{
        if(!groupId){
            return
        }
        const unsubscribe = clientService.listenRequest({
            groupId,
            onAdded: (requests)=>{
                setStatus('loaded')
                setRequestState(before=>upsertMany(before,requests))
            },
            onModified: (requests)=>{
                setRequestState(before=>updateMany(before,requests))
            },
            onDeleted:(requests)=>{
                setRequestState(before=>deleteMany(before,requests))
            },
            sender : 'me'
        })
        return ()=>{
            unsubscribe()
        }
    },[groupId,clientService])
    const requests = useMemo(()=>Object.values(requestState.entities),[requestState])
    const latestRequest = useMemo(()=>{
        return requests.length > 0 ? requests.sort((a,b)=>b.created-a.created)[0] : undefined
    },[requests])
    const latestStatus = getRequestStatus(latestRequest)
    const exceededLimit = requests.length > 5 && latestStatus === 'rejected'
    return {
        requestState,
        requests,
        status,
        latestRequest,
        latestStatus,
        exceededLimit
    }
}

export default useRequestListener