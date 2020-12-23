import {useEffect,useRef, useCallback, useContext} from 'react'
import { useDispatch } from "react-redux";
import FirebaseContext from '../../context/FirebaseContext'
import { actions } from '../../modules/bookmarkSlice'

const useBookmarks = ()=>{
    const dispatch = useDispatch()
    const {clientService} = useContext(FirebaseContext)
    type Unsubscribe = ReturnType<typeof clientService.listenBookmarks>
    const unsubscribes = useRef<{[key:string]:Unsubscribe}>({})
    const onLoad = useCallback((groupId)=>{
        const unsub = clientService.listenBookmarks(groupId, (bookmarks)=>{
            dispatch(actions.add(bookmarks))
        }, (bookmarks)=>{
            dispatch(actions.modify(bookmarks))
        }, (bookmarks)=>[
            dispatch(actions.delete(bookmarks))
        ])
        unsubscribes.current[groupId] = unsub
    },[clientService])
    const onUnload = useCallback((groupId)=>{
        unsubscribes.current[groupId] && 
        unsubscribes.current[groupId]()
        delete unsubscribes.current[groupId]
        dispatch(actions.removeGroup(groupId))
    },[])
    const clearAll = useCallback(()=>{
        for(const unsubscribe in unsubscribes.current){
            unsubscribes.current[unsubscribe]()
            delete unsubscribes.current[unsubscribe]
        }
        dispatch(actions.clear())
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
        onUnload,
        clearAll
    }
}

export default useBookmarks