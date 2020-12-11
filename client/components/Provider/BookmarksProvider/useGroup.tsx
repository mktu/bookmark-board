import { useEffect, useContext } from 'react'
import FirebaseContext from '../../../context/FirebaseContext'
import { useDispatch } from "react-redux";
import { actions } from '../../../modules/groupSlice'
import { useProfile } from '../../../modules/profileSlice'
import { actions as loadStatusActions } from '../../../modules/loadStatusSlice'

export type GroupMonitor = {
    onLoad : (groupId:string, owner : boolean)=>void,
    onUnload : (groupId:string, owner : boolean)=>void,
}

const useGroup = (groupMonitors : GroupMonitor[]) => {
    const { clientService } = useContext(FirebaseContext)
    const { id } = useProfile()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadStatusActions.onLoad('group'))
    }, [])

    useEffect(() => {
        if (!id) {
            return
        }
        const { listenGroups } = clientService;
        const unsub = listenGroups(id, (groups) => {
            dispatch(loadStatusActions.onLoaded('group'))
            for(const group of groups){
                dispatch(loadStatusActions.onLoad(group.id))
                for(const monitor of groupMonitors){
                    monitor.onLoad(group.id, group.owner===id)
                }
            }
            dispatch(actions.addGroups({ groups }))
        }, (groups) => {
            dispatch(actions.modifyGroups({ groups }))
        }, (groups) => {
            dispatch(actions.removeGroups({ groups }))
            for(const group of groups){
                dispatch(loadStatusActions.onUnload(group.id))
                for(const monitor of groupMonitors){
                    monitor.onUnload(group.id, group.owner===id)
                }
            }
        })
        return () => {
            unsub()
            dispatch(actions.clear())
        }
    }, [clientService, id])
}

export default useGroup