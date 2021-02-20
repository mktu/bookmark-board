import { useContext, useMemo, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useGroupById, initialGroup } from '../modules/groupSlice'
import { useUsersByIds } from '../modules/usersSlice'
import { useRefinementById } from '../modules/groupRefinementSlice'
import FirebaseContext from '../context/FirebaseContext'
import { saveRefinement } from '../utils/localStorages/group'

const createKey = ()=>Math.random().toString(32).substring(2)

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

export const useRefinements = (groupId?: string) => {
    const refinements = useRefinementById(groupId)
    const { colorMasks = [] } = refinements
    const updateColorFilters = (updateColors: { color: string, show: boolean }[]) => {
        const unmasked = updateColors.filter(c => c.show).map(c => c.color)
        const masked = updateColors.filter(c => !c.show).map(c => c.color)
        if (groupId) {
            let mask = colorMasks
            mask = mask.filter(v => !unmasked.includes(v))
            mask = Array.from(new Set([...mask, ...masked]))
            saveRefinement(groupId, { colorMasks: mask })
        }
    }

    return {
        updateColorFilters,
        refinements,
        colorMasks,
    }
}

export const useBookmarkGroup = (groupId?: string) => {
    const base = useGroupById(groupId)
    const [update, setUpdate] = useState<Partial<BookmarkGroup>>({})
    const merge = useCallback((val: Partial<BookmarkGroup>) => {
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

    const colors = useMemo(() => {
        if (!group?.colors) return []
        return Object.keys(group.colors).sort((a, b) => {
            return group.colors[a].idx - group.colors[b].idx
        }).map(c => ({
            id:c,
            ...group.colors[c],
        }))
    }, [group?.colors])
    const router = useRouter()
    const editors = useUsersByIds(group?.users || [])
    const { clientService } = useContext(FirebaseContext)

    const handleRemoveUser = useCallback((uid: string) => {
        merge({ users: group.users.filter(u => u !== uid) })
    }, [group?.users, merge])

    const handleDeleteGroup = () => {
        clientService.deleteGroup(group.id, () => {
            router.push('/bookmarks')
        })
    }
    const updateGroup = useCallback((key: keyof BookmarkGroup) => (value: string) => {
        merge({ [key]: value })
    }, [merge])

    const updateColor = useCallback((id: string, data: Partial<BookmarkColorDescription>) => {
        const colors = { ...group.colors }
        if (colors[id]) {
            colors[id] = { ...colors[id], ...data }
            merge({colors})
        }
    },[group?.colors,merge])

    const handleChangeColorIndex = useCallback((id: string, next: number) => {
        const indecies = colors.map(c => ({ id: c.id, remove: id === c.id }))
        indecies.splice(next, 0, { id, remove: false })
        const newIndecies = indecies.filter(c => !c.remove).map(c => c.id)
        const update = newIndecies.reduce((acc, cur, idx) => {
            acc[cur].idx = idx
            return acc
        }, { ...group.colors })
        merge({colors: update})
    },[colors,group?.colors,merge])

    const handleAddColor = useCallback((name: string, color: string) => {
        if (group.colors && Object.keys(group.colors).find(v=>group.colors[v].color===color) ) {
            toast.warn('すでにこの色は登録されています')
            return
        }
        const idx = Object.keys(group?.colors).length
        const colors = { ...group?.colors, [createKey()]: { name, color, idx } }
        merge({ colors })
    },[group?.colors, merge])

    const handleDeleteColors = useCallback((deleteColors: string[]) => {
        const colors = { ...group.colors }
        for (const c of deleteColors) {
            if (colors[c]) {
                delete colors[c]
            }
        }
        merge({ colors })
    },[group?.colors,merge])

    const hasChange = useMemo(()=>Object.keys(update).length > 0,[update])
    const handleSubmit = useCallback((notifier?: Notifier) => {
        if (!hasChange) {
            return
        }
        clientService.modifyGroup(groupId, update, () => {
            notifier()
        })
    },[clientService,update,hasChange,groupId])

    return {
        group,
        editors,
        colors,
        handleRemoveUser,
        updateGroup,
        handleDeleteGroup,
        updateColor,
        handleAddColor,
        handleDeleteColors,
        handleChangeColorIndex,
        handleSubmit,
        hasChange
    }
}
