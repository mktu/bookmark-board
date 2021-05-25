import { useContext, useMemo, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useGroupById, initialGroup } from '@modules/groupSlice'
import { useUsersByIds } from '@modules/usersSlice'
import { useProfile } from '@modules/profileSlice'
import FirebaseContext from '@context/FirebaseContext'

export const useBookmarkGroup = (groupId?: string) => {
    const base = useGroupById(groupId)
    const profile = useProfile()
    const [update, setUpdate] = useState<Partial<BookmarkGroup>>({})
    const updatePartial = useCallback((val: Partial<BookmarkGroup>) => {
        setUpdate(before => ({
            ...before,
            ...val
        }))
    }, [])
    const hasOwnership = profile?.id === base?.owner
    const hydrateColor = useMemo(()=>base?.colors || {},[base])

    const bookmarkColors = useMemo(() => {
        return Object.keys(hydrateColor).reduce((acc, cur, idx) => {
            acc[cur] = { idx, ...hydrateColor[cur] }
            return acc
        }, {} as BookmarkColors)
    }, [hydrateColor])

    const group: BookmarkGroup = useMemo(() => ({
        ...initialGroup,
        ...base,
        colors: bookmarkColors,
        ...update
    }), [base, update, bookmarkColors])

    const router = useRouter()
    const editors = useUsersByIds(group?.users || [])
    const { clientService } = useContext(FirebaseContext)

    const handleRemoveUser = useCallback((uid: string) => {
        updatePartial({ users: group.users.filter(u => u !== uid) })
    }, [group?.users, updatePartial])

    const handleDeleteGroup = () => {
        clientService.deleteGroup(group.id, () => {
            router.push('/bookmarks')
        })
    }
    const updateGroup = useCallback((key: keyof BookmarkGroup) => (value: string) => {
        updatePartial({ [key]: value })
    }, [updatePartial])


    const hasChange = useMemo(() => Object.keys(update).length > 0 &&
        Object.keys(update).some(key => update[key] !== base[key])
        , [update, base])

    const handleSubmit = useCallback((partial?: Partial<BookmarkGroup>) =>
        new Promise<{ after: Partial<BookmarkGroup>, before: Partial<BookmarkGroup> }>((resolve, reject) => {
            if (!hasChange && !partial) {
                return
            }
            const data = partial ? { ...update, ...partial } : update
            // searchable will be modified by cloud function 
            const saveFirestore = Object.keys(data).filter(key => key !== 'searchable').reduce((acc, cur) => {
                acc[cur] = data[cur]
                return acc
            }, {})
            clientService.modifyGroup(groupId, saveFirestore, () => {
                resolve({
                    after: data,
                    before: base
                })
            }, reject)
        })
        , [clientService, update, hasChange, groupId, base])


    return {
        group,
        editors,
        handleRemoveUser,
        updateGroup,
        updatePartial,
        handleDeleteGroup,
        handleSubmit,
        hasChange,
        hasOwnership
    }
}