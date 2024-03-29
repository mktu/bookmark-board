import { useContext, useMemo, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useGroupById, initialGroup, useGroupsByUser } from '@modules/groupSlice'
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
    const hydrateColor = useMemo(() => base?.colors || {}, [base])

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

    const handleChangeIcon = useCallback((emoji: EmojiIconType) => {
        updatePartial({
            emojiIcon: emoji
        })
    }, [updatePartial])

    const handleDeleteGroup = async () => {
        await clientService.deleteGroup(group.id)
        router.push('/bookmarks')
    }
    const updateGroup = useCallback((key: keyof BookmarkGroup) => (value: string) => {
        updatePartial({ [key]: value })
    }, [updatePartial])


    const hasChange = useMemo(() => Object.keys(update).length > 0 &&
        Object.keys(update).some(key => update[key] !== base[key])
        , [update, base])

    // update immediately
    const leaveGroup = useCallback(() => new Promise<void>((resolve, reject) => {
        profile?.id && clientService.modifyGroup(groupId, {
            users: group.users.filter(u => u !== profile?.id)
        }, () => {
            resolve()
        }, reject)
    }), [profile?.id, clientService, group, groupId])

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
                // Because algolia is updated only if the name and description change (other property is ignored!)
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
        leaveGroup,
        hasChange,
        hasOwnership,
        handleChangeIcon
    }
}

export const useGroupSelector = (initGroupId?: string) => {
    const profile = useProfile()
    const groups = useGroupsByUser(profile.id)
    const [selectedGroup, selectGroup] = useState(groups.find(g => initGroupId && g.id === initGroupId))

    const handleSelect = (groupId: string) => {
        selectGroup(groups.find(g => g.id === groupId))
    }

    return {
        groups,
        selectedGroup,
        handleSelect
    }
}