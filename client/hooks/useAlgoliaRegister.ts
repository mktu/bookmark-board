import { useContext, useState, useCallback, useEffect } from 'react'
import FirebaseContext from '../context/FirebaseContext'


const canUpdateAlgolia = (after: Partial<BookmarkGroup>, before: Partial<BookmarkGroup>) =>
    ( before.name !== after.name || before.description !== after.description )

export const useAlgoliaRegister = (groupId:string, baseSearchable?:boolean) => {
    const [searchable,setSearchable] = useState(false)
    
    const { clientService } = useContext(FirebaseContext)
    useEffect(()=>{
        setSearchable(Boolean(baseSearchable))
    },[baseSearchable])
    
    const canCreate = searchable && !baseSearchable
    const canDelete = !searchable && Boolean(baseSearchable)

    const handleCreateAlgolia = useCallback(async () => {
        if (canCreate) {
            await clientService.createAlgoliaIndex(groupId)
        }
    }, [clientService, groupId, canCreate])
    const handleDeleteAlgolia = useCallback(async () => {
        if (canDelete) {
            await clientService.deleteAlgoliaIndex(groupId)
        }
    }, [clientService, groupId, canDelete])
    const handleUpdateAlgolia = useCallback(async (after: Partial<BookmarkGroup>, before: Partial<BookmarkGroup>) => {
        if (searchable && canUpdateAlgolia(after, before)) {
            await clientService.updateAlgoliaIndex(groupId, after)
        }
    }, [clientService, groupId, searchable])

    return {
        handleUpdateAlgolia,
        handleCreateAlgolia,
        handleDeleteAlgolia,
        setSearchable,
        searchable,
        canCreate,
        canDelete,
    }
}