import { useContext, useMemo, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useGroupById, initialGroup } from '../modules/groupSlice'
import { useUsersByIds } from '../modules/usersSlice'
import FirebaseContext from '../context/FirebaseContext'

export const createKey = () => Math.random().toString(32).substring(2)

const defaultColors: BookmarkColors = [
    ['#EF4511', 'グループ1'],
    ['#EBB910', 'グループ2'],
    ['#78E1A8', 'グループ3'],
    ['#89CFFA', 'グループ4'],
].reduce((acc, cur, idx) => {
    const key = createKey()
    acc[key] = {
        color: cur[0],
        name: cur[1],
        idx
    }
    return acc
}, {})

export const useBookmarkGroup = (groupId?: string) => {
    const base = useGroupById(groupId)
    const [update, setUpdate] = useState<Partial<BookmarkGroup>>({})
    const updatePartial = useCallback((val: Partial<BookmarkGroup>) => {
        setUpdate(before => ({
            ...before,
            ...val
        }))
    }, [])
    const hydrateColor = base && base.colors || defaultColors

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


    const hasChange = useMemo(() => Object.keys(update).length > 0, [update])
    const handleSubmit = useCallback((partial?: Partial<BookmarkGroup>) =>
        new Promise<void>((resolve, reject) => {
            if (!hasChange && !partial) {
                return
            }
            const data = partial ? { ...update, ...partial } : update
            clientService.modifyGroup(groupId, data, () => {
                resolve()
            }, reject)
        })
        , [clientService, update, hasChange, groupId])

    return {
        group,
        editors,
        handleRemoveUser,
        updateGroup,
        updatePartial,
        handleDeleteGroup,
        handleSubmit,
        hasChange
    }
}