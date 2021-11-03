import { useEffect, useContext } from 'react'
import FirebaseContext from '../../context/FirebaseContext'
import { useDispatch } from "react-redux";
import { actions } from '../../modules/groupSlice'
import { useProfile } from '../../modules/profileSlice'

export type GroupMonitor = {
    onLoad: (groupId: string, owner: boolean) => Promise<void>,
    onLoaded: () => void,
    onUnload: (groupId: string, owner: boolean) => void,
    clearAll: () => void
}

const useGroup = (groupMonitors: GroupMonitor[]) => {
    const { clientService } = useContext(FirebaseContext)
    const { id } = useProfile()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!id) {
            return
        }
        const { listenGroups } = clientService;
        const unsub = listenGroups(id, (groups) => {
            groupMonitors.forEach(monitor=>{
                const promises: Promise<void>[] = []
                for (const group of groups) {
                    promises.push(monitor.onLoad(group.id, group.owner === id))
                }
                Promise.all(promises).then(()=>{
                    monitor.onLoaded()
                })
            })
            dispatch(actions.addGroups({ groups }))
        }, (groups) => {
            dispatch(actions.modifyGroups({ groups }))
        }, (groups) => {
            dispatch(actions.removeGroups({ groups }))
            for (const group of groups) {
                for (const monitor of groupMonitors) {
                    monitor.onUnload(group.id, group.owner === id)
                }
            }
        })
        return () => {
            unsub()
            dispatch(actions.clear())
            for (const monitor of groupMonitors) {
                monitor.clearAll()
            }
        }
    }, [clientService, id, dispatch, groupMonitors])
}

export default useGroup