import { useEffect, useContext, useState } from 'react'
import FirebaseContext from '../context/FirebaseContext'
import { createInitialEntityState, upsertMany, updateMany, deleteMany } from './entityGenerator'

const useCommentListener = (groupId:string) => {
    const [reactions,setReactions] = useState(createInitialEntityState<Reaction>())
    const {clientService} = useContext(FirebaseContext)
    useEffect(()=>{
        const unsubscribe = clientService.listenReactions(groupId, (reactions)=>{
            setReactions(before=>upsertMany(before,reactions))
        },(reactions)=>{
            setReactions(before=>updateMany(before,reactions))
        },(reactions)=>{
            setReactions(before=>deleteMany(before,reactions))
        })
        return ()=>{
            unsubscribe()
        }
    },[groupId,clientService])
    return reactions
}

export default useCommentListener