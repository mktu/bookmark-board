import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useGroupStatus, useGroupById } from '@modules/groupSlice'
import { useBookmarkIdsByRefinements, useBookmarkStatus, useBookmarkById } from '@modules/bookmarkSlice'
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
    const bookmark = useBookmarkById(bookmarkId)

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
    useEffect(()=>{
        // deleted bookmark or non exist bookmark
        if(groupId && bookmarkId && alternativeMode === 'bookmark' && !bookmark?.id){
            router.replace(`/bookmarks/[[...ids]]`, `/bookmarks/${groupId}`, { shallow: true })
        }
    },[bookmarkId,bookmark?.id,groupId,router,alternativeMode])
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
        jumpToGroupRoot,
        bookmark
    }
}



export default useBookmarkGroupRoot