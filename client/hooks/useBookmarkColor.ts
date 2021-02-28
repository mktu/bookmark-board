import { useMemo, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useBookmarkGroup, createKey } from './useBookmarkGroup'

export const useBookmarkColor = (groupId?: string) => {
    const { group, updatePartial, handleSubmit, hasChange } = useBookmarkGroup(groupId)

    const colors = useMemo(() => {
        if (!group?.colors) return []
        return Object.keys(group.colors).sort((a, b) => {
            return group.colors[a].idx - group.colors[b].idx
        }).map(c => ({
            id: c,
            ...group.colors[c],
        }))
    }, [group?.colors])

    const updateGroup = useCallback((key: keyof BookmarkGroup) => (value: string) => {
        updatePartial({ [key]: value })
    }, [updatePartial])

    const updateColor = useCallback((id: string, data: Partial<BookmarkColorDescription>) => {
        const colors = { ...group.colors }
        if (colors[id]) {
            colors[id] = { ...colors[id], ...data }
            updatePartial({ colors })
        }
    }, [group?.colors, updatePartial])

    const handleChangeColorIndex = useCallback((id: string, next: number) => {
        const indecies = colors.map(c => ({ id: c.id, remove: id === c.id }))
        indecies.splice(next, 0, { id, remove: false })
        const newIndecies = indecies.filter(c => !c.remove).map(c => c.id)
        const update = newIndecies.reduce((acc, cur, idx) => {
            acc[cur].idx = idx
            return acc
        }, { ...group.colors })
        updatePartial({ colors: update })
    }, [colors, group?.colors, updatePartial])

    const handleAddColor = useCallback((name: string, color: string) => {
        if (group.colors && Object.keys(group.colors).find(v => group.colors[v].color === color)) {
            toast.warn('すでにこの色は登録されています')
            return
        }
        const idx = Object.keys(group?.colors).length
        const colors = { ...group?.colors, [createKey()]: { name, color, idx } }
        updatePartial({ colors })
    }, [group?.colors, updatePartial])

    const handleDeleteColors = useCallback((deleteColors: string[]) => {
        const colors = { ...group.colors }
        for (const c of deleteColors) {
            if (colors[c]) {
                delete colors[c]
            }
        }
        updatePartial({ colors })
    }, [group?.colors, updatePartial])


    return {
        colors,
        updateGroup,
        updatePartial,
        updateColor,
        handleAddColor,
        handleDeleteColors,
        handleChangeColorIndex,
        handleSubmit,
        hasChange
    }
}