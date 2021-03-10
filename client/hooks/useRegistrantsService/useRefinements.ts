import {useEffect,useRef, useCallback, useMemo} from 'react'
import { useDispatch } from "react-redux";
import { actions } from '../../modules/groupRefinementSlice'
import { registListener } from '../../utils/localStorages/group' 

const useRefinements = ()=>{
    const dispatch = useDispatch()
    type Unsubscribe = ReturnType<typeof registListener>
    const unsubscribes = useRef<{[key:string]:Unsubscribe}>({})
    const onLoad = useCallback((groupId)=>new Promise<void>((resolve)=>{
        const unsub = registListener(groupId, (newValue)=>{
            dispatch(actions.addRefinements({refinements:[newValue]}))
            resolve()
        })
        unsubscribes.current[groupId] = unsub
    }),[dispatch])
    const onUnload = useCallback((groupId)=>{
        unsubscribes.current[groupId] && 
        unsubscribes.current[groupId]()
        delete unsubscribes.current[groupId]
    },[])
    const onLoaded = useCallback(()=>{
        console.debug('initial refinements loaded')
    },[])
    const clearAll = useCallback(()=>{
        for(const unsubscribe in unsubscribes.current){
            unsubscribes.current[unsubscribe]()
            delete unsubscribes.current[unsubscribe]
        }
        dispatch(actions.clear())
    },[dispatch])
    useEffect(()=>{
        return ()=>{
            for(const unsub of Object.values(unsubscribes.current)){
                unsub()
            }
            unsubscribes.current = {}
        }
    },[])
    return useMemo(()=>({
        onLoad,
        onLoaded,
        onUnload,
        clearAll
    }),[onLoad,onUnload,clearAll,onLoaded])
}

export default useRefinements