import { useState, useMemo, useCallback } from 'react'
import { useBookmarksByKeyword } from '@modules/bookmarkSlice'
import { useGroups } from '@modules/groupSlice'
import { combineGroups } from '@utils/searchLogic'
import { useDelayedInput } from './useTextInput'

const DefaultLoadCount = 10

const useBookmarkSearch = (initCount=DefaultLoadCount, loadCount=DefaultLoadCount) => {
    const { confirmed, latest, setLatest } = useDelayedInput('', 300)
    const groups = useGroups()
    const [size, setSize] = useState(initCount)
    const bookmarks = useBookmarksByKeyword(confirmed)
    const ungroupedTargets = useMemo(() => bookmarks.slice(0, size).map(b=>({
        ...b,
        groupName : groups.find(g=>g.id === b.groupId)?.name
    })), [bookmarks, size, groups]);
    const searchTargets = useMemo(() => {
        return combineGroups(groups, bookmarks, size).filter(g => g.bookmarks.length > 0)
    }, [bookmarks, groups, size])
    const loadMore = useCallback(() => {
        setTimeout(() => {
            setSize(before => before + loadCount)
        }, 500);
    }, [loadCount])
    const hasMore = useMemo(() => bookmarks.length > 0 && size < bookmarks.length, [bookmarks, size])
    return {
        keyword: latest,
        setKeyword: setLatest,
        bookmarks,
        loadMore,
        hasMore,
        searchTargets,
        ungroupedTargets
    }
}

export default useBookmarkSearch