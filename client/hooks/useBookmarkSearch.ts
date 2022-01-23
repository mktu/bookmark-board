import { useState, useMemo, useCallback } from 'react'
import { useBookmarksByKeyword } from '@modules/bookmarkSlice'
import { useGroups } from '@modules/groupSlice'
import { useDelayedInput } from './useTextInput'

const LoadCount = 10

const useBookmarkSearch = () => {
    const { confirmed, latest, setLatest } = useDelayedInput('', 300)
    const groups = useGroups()
    const [size, setSize] = useState(LoadCount)
    const base = useBookmarksByKeyword(confirmed)
    const bookmarks = useMemo(() => confirmed ? base.slice(0, size) : [], [confirmed, base, size])
    const searchTargets = useMemo(()=>groups.map(g=>({
        ...g,
        bookmarks : bookmarks.filter(b=>b.groupId===g.id)
    })).filter(g=>g.bookmarks.length>0),[bookmarks,groups])
    const loadMore = useCallback(() => {
        setSize(before => before + LoadCount)
    }, [])
    const hasMore = useMemo(() => base.length > 0 && size < base.length, [base, size])
    return {
        keyword: latest,
        setKeyword: setLatest,
        bookmarks,
        loadMore,
        hasMore,
        searchTargets
    }
}

export default useBookmarkSearch