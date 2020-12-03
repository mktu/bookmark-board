import { useEffect, useContext, useState, useMemo } from 'react'
import FirebaseContext from '../../../context/FirebaseContext'
import { useEditorsByIds, actions } from '../../../modules/editorsSlice'
import { useGroupsByUser } from '../../../modules/groupSlice'
import { useProfile } from '../../../modules/profileSlice'
import { useDispatch } from "react-redux";

const useEditors = () => {
    const dispatch = useDispatch()
    const { id } = useProfile()
    const groups = useGroupsByUser(id)
    const bookmarkUids = useMemo(() => groups.reduce((acc,value) => {
        acc = [...acc,...value.users]
        return acc
    },[] as string[]),[groups])
    const { clientService } = useContext(FirebaseContext)
    const [status, setStatus] = useState<LoadStatus['status']>('loaded')
    const editors = useEditorsByIds(bookmarkUids).map(p => p.id)
    const key = Array.from(new Set(bookmarkUids.filter(uid => !editors.includes(uid)))).sort().join(',')
    useEffect(() => {
        if (key && status === 'loaded') {
            setStatus('loading')
            const retrieveTraget = key.split(',')
            clientService.getProfiles(retrieveTraget, (editors) => {
                dispatch(actions.addEditors({ editors }))
            })
        }
    }, [key, status])
    useEffect(()=>{
        if(!key){
            setStatus('loaded')
        }
    },[key])
}

export default useEditors