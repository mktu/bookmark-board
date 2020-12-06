import { useEffect, useContext, useState, useMemo, useCallback } from 'react'
import FirebaseContext from '../context/FirebaseContext'
import { createInitialEntityState, upsertMany, updateMany, deleteMany } from './entityGenerator'

const useReactionListener = (groupId:string, type:Reaction['type']) => {
    const [reactionState,setReactionState] = useState(createInitialEntityState<Reaction>())
    const [status,setStatus] = useState<LoadStatus['status']>('loading')
    const {clientService} = useContext(FirebaseContext)
    useEffect(()=>{
        const unsubscribe = clientService.listenReactions(groupId, type, (reactions)=>{
            setStatus('loaded')
            setReactionState(before=>upsertMany(before,reactions))
        },(reactions)=>{
            setReactionState(before=>updateMany(before,reactions))
        },(reactions)=>{
            setReactionState(before=>deleteMany(before,reactions))
        })
        return ()=>{
            unsubscribe()
        }
    },[groupId,clientService])
    const reactions = useMemo(()=>Object.values(reactionState.entities),[reactionState])
    const getReactionByUid = useCallback((uid:string)=>{
        return reactions.find(v=>v.user===uid)
    },[reactions])
    return {
        reactionState,
        reactions,
        status,
        getReactionByUid
    }
}

export default useReactionListener