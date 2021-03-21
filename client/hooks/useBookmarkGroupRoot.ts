import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useGroupStatus, useGroupById } from '@modules/groupSlice'
import { useBookmarkIdsByRefinements, useBookmarkStatus } from '@modules/bookmarkSlice'
import { useRefinementById, hasListFilter } from '@modules/groupRefinementSlice'

const useBookmarkGroupRoot = (groupId?: string, bookmarkId?: string) => {
    const router = useRouter()
    const status = useGroupStatus()
    const bookmarkStatus = useBookmarkStatus()
    const group = useGroupById(groupId)
    const refinements = useRefinementById(groupId)
    
    const hasFilter = hasListFilter(refinements)
    // bookmarkIds may change every time new bookmark group has loaded
    const bookmarkIds = useBookmarkIdsByRefinements(refinements)
    const jumpToGroupRoot = useCallback(() => {
        router.push(`/bookmarks/[[...ids]]`, `/bookmarks/${groupId}`, { shallow: true })
    }, [router, groupId])
    let alternativeMode = bookmarkId && 'bookmark'
    if (bookmarkId === 'setting') {
        alternativeMode = 'setting'
    }
    if (bookmarkId === 'share') {
        alternativeMode = 'share'
    }
    if (bookmarkId === 'colors') {
        alternativeMode = 'colors'
    }
    useEffect(() => {
        if (!groupId) {
            return
        }
        if (status === 'loading') {
            return
        }
        if (!group) {
            router.replace(`/bookmarks`, `/bookmarks`, { shallow: true })
            return
        }
        localStorage.setItem('groupId', group.id)
    }, [group, status, groupId, router])
    return {
        group,
        alternativeMode,
        status,
        bookmarkStatus,
        hasFilter,
        bookmarkIds,
        jumpToGroupRoot
    }
}



export default useBookmarkGroupRoot