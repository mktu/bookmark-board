import { useEffect, useContext } from 'react'
import FirebaseContext from '../context/FirebaseContext'
import { useDispatch } from "react-redux";
import {actions} from '../modules/commentSlice'

const useCommentListener = (groupId:string, limit:number) => {
    const dispatch = useDispatch()
    const {clientService} = useContext(FirebaseContext)
    useEffect(()=>{
        const unsubscribe = clientService.listenComments(groupId, limit, (comments)=>{
            dispatch(actions.upsert(comments))
        },(comments)=>{
            dispatch(actions.modify(comments))
        },(comments)=>{
            dispatch(actions.delete(comments))
        })
        return ()=>{
            unsubscribe()
        }
    },[groupId,limit,clientService])
}

export default useCommentListener