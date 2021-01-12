import {useEffect,useRef, useCallback} from 'react'
import { useDispatch } from "react-redux";
import { actions } from '../../modules/groupRefinementSlice'
import { registListener } from '../../utils/localStorages/group' 

const useRefinements = ()=>{
    const dispatch = useDispatch()
    type Unsubscribe = ReturnType<typeof registListener>
    const unsubscribes = useRef<{[key:string]:Unsubscribe}>({})
    const onLoad = useCallback((groupId)=>{
        const unsub = registListener(groupId, (newValue)=>{
            dispatch(actions.addRefinements({refinements:[newValue]}))
        })
        unsubscribes.current[groupId] = unsub
    },[])
    const onUnload = useCallback((groupId)=>{
        unsubscribes.current[groupId] && 
        unsubscribes.current[groupId]()
        delete unsubscribes.current[groupId]
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

export default useRefinements