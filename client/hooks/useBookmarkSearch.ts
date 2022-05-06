import { useState, useMemo, useCallback, useEffect } from 'react'
import { useBookmarksByKeyword } from '@modules/bookmarkSlice'
import { useGroups } from '@modules/groupSlice'
import { combineGroups } from '@utils/searchLogic'
import { useDelayedInput } from './useTextInput'

const LoadCount = 10

const useBookmarkSearch = () => {
    const { confirmed, latest, setLatest } = useDelayedInput('', 300)
    const groups = useGroups()
    const [size, setSize] = useState(LoadCount)
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
            setSize(before => before + LoadCount)
        }, 500);
    }, [])
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