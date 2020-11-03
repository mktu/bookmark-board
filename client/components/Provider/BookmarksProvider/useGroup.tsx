import { useEffect, useContext } from 'react'
import FirebaseContext from '../../../context/FirebaseContext'
import {BookmarkServices} from '../../../context/BookmarkContext'
import { useDispatch } from "react-redux";
import { actions } from '../../../modules/groupSlice'
import { useProfile } from '../../../modules/profileSlice'
import { actions as loadStatusActions } from '../../../modules/loadStatusSlice'

const useGroup = (bookmarkService : BookmarkServices) => {
    const { clientService } = useContext(FirebaseContext)
    const { id } = useProfile()
    const dispatch = useDispatch()

    useEffect(() => {
        loadStatusActions.onLoad('group')
    }, [])

    useEffect(() => {
        if (!id) {
            return
        }
        const { listenGroups } = clientService;
        const unsub = listenGroups(id, (groups) => {
            loadStatusActions.onLoaded('group')
            for(const group of groups){
                loadStatusActions.onLoad(group.id)
                bookmarkService.load(group.id)
            }
            dispatch(actions.addGroups({ groups }))
        }, (groups) => {
            dispatch(actions.modifyGroups({ groups }))
        }, (groups) => {
            dispatch(actions.removeGroups({ groups }))
            for(const group of groups){
                loadStatusActions.onUnload(group.id)
                bookmarkService.unload(group.id)
            }
        })
        return () => {
            unsub()
            dispatch(actions.clear())
        }
    }, [clientService, id])
}

export default useGroup