import { useState, useMemo, useCallback } from 'react'
import { useBookmarksByKeyword } from '../modules/bookmarkSlice'
import { useDelayedInput } from './useTextInput'

const LoadCount = 10

const useBookmarkSearch = () => {
    const { confirmed, latest, setLatest } = useDelayedInput('', 300)
    const [size, setSize] = useState(LoadCount)
    const base = useBookmarksByKeyword(confirmed)
    const bookmarks = useMemo(() => confirmed ? base.slice(0, size) : [], [confirmed, base, size])
    const loadMore = useCallback(() => {
        setSize(before => before + LoadCount)
    }, [])
    const hasMore = useMemo(() => bookmarks.length > 0 && size < bookmarks.length, [bookmarks, size])
    return {
        keyword: latest,
        setKeyword: setLatest,
        bookmarks,
        loadMore,
        hasMore
    }
}

export default useBookmarkSearch