import { useMemo, useCallback, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import FirebaseContext from '@context/FirebaseContext'

const useBookmarkBulkOperation = (groupId:string, boolmarkIds:string[]) => {
    const [checkList,setCheckList] = useState<{[id:string]:boolean}>({})
    const { clientService } = useContext(FirebaseContext)
    const disabled = useMemo(()=>boolmarkIds.length===0,[boolmarkIds])
    const selectedBookmarks = useMemo(()=>Object.keys(checkList).filter(v=>boolmarkIds.includes(v) && checkList[v]),[checkList,boolmarkIds])
    const checkState : 'filled' | 'some' | 'none' = (selectedBookmarks.length === boolmarkIds.length) ? 'filled' : selectedBookmarks.length > 0 ? 'some' : 'none'
    const onCheck = (id:string, checked:boolean)=>{
        setCheckList(before=>({
            ...before,
            [id] : checked
        }))
    }
    useEffect(()=>{
        setCheckList({})
    },[groupId])

    useEffect(()=>{
        setCheckList(before=>Object.keys(before).filter(v=>boolmarkIds.includes(v)).reduce((acc,cur)=>{
            acc[cur] = before[cur]
            return acc
        }, {} as typeof checkList ))
    },[boolmarkIds])

    const deleteBookmarks = useCallback(async ()=>{
        if(selectedBookmarks.length === 0){
            return
        }
        try{
            await clientService.deleteBookmarks(groupId, selectedBookmarks)
            toast.success('ブックマークを削除しました')
        }catch(e){
            console.error(e)
            toast.error('削除に失敗しました')
            throw e
        }
    },[selectedBookmarks,groupId,clientService])

    const updateColors = useCallback(async (color:string)=>{
        if(selectedBookmarks.length === 0){
            return
        }
        try{
            await clientService.modifyBookmarks(groupId, selectedBookmarks, {color})
            setCheckList({})
        }catch(e){
            console.error(e)
            toast.error('色変更に失敗しました')
            throw e
        }
    },[selectedBookmarks,groupId,clientService])

    const checkAll = useCallback((check:boolean)=>{
        setCheckList(boolmarkIds.reduce((acc,cur)=>{
            acc[cur] = check
            return acc
        }, {} as typeof checkList))
    },[boolmarkIds])

    return {
        checkList,
        onCheck,
        deleteBookmarks,
        checkAll,
        checkState,
        updateColors,
        disabled
    }
}

export default useBookmarkBulkOperation