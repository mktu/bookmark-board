import { useContext, useEffect, useCallback, useState, useMemo } from 'react'
import { toast } from 'react-toastify';
import LiffContext from '@context/LiffContext'
import { getOrigin } from '@utils/index'
import { initialBookmark } from '@modules/bookmarkSlice'

const BookmarkPath = `${getOrigin()}/api/line/bookmarks`

export const useBookmark = (groupId:string, bookmarkId:string ) => {
    const { idToken, closure } = useContext(LiffContext)
    const { close } = closure
    const [error, setError] = useState('')
    const [fetching, setFetching] = useState(false)
    const [posting, setPosting] = useState(false)
    const [base, setBookmark] = useState<Bookmark>()
    const [colors,setColors] = useState<BookmarkColors>({})
    const [update, setUpdate] = useState<Partial<Bookmark>>({})
    const updateBookmark = useCallback((key: keyof Bookmark) => (value: string) => {
        setUpdate(before => ({ ...before, ...{ [key]: value } }))
    }, [])
    const bookmark = useMemo(()=>({
        ...initialBookmark,
        ...base,
        ...update
    }),[base,update])
    const fetchBookmark = useCallback(async () => {
        if (!idToken) {
            return
        }
        setFetching(true)
        const params = {
            idToken,
        }
        const queryParams = new URLSearchParams(params)
        const response = await fetch(`${BookmarkPath}/${groupId}/${bookmarkId}?${queryParams}`)
        const json = await response.json() as {
            bookmark : Bookmark,
            colors : BookmarkColors
        }
        setBookmark(json.bookmark)
        setColors(json.colors)
        setFetching(false)

    }, [groupId, bookmarkId, idToken])
    const submitBookmark = useCallback(async () => {
        setPosting(true)
        const response = await fetch(`${BookmarkPath}/${groupId}/${bookmarkId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken,
                update,
            })
        })
        if(!response.ok){
            setError('ブックマークの更新に失敗しました')
            return
        }
        toast.success('ブックマークを更新しました')
        setPosting(false)
    }, [idToken, groupId, bookmarkId, update])
    const onClose = useCallback(async () => {
        await close({
            close: true,
        })
    }, [close])
    useEffect(() => {
        fetchBookmark().catch(e => {
            console.error(e)
            setError('ブックマークの取得に失敗しました')
            setFetching(false)
        })
    }, [fetchBookmark])

    const hasChange = Object.keys(update).length > 0

    return {
        bookmark,
        error,
        fetching,
        posting,
        colors,
        hasChange,
        submitBookmark,
        onClose,
        updateBookmark
    }
}

export const useBookmarks = (groupId:string) => {
    const { idToken, closure } = useContext(LiffContext)
    const { close } = closure
    const [error, setError] = useState('')
    const [fetching, setFetching] = useState(false)
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const fetchBookmarks = useCallback(async () => {
        if (!idToken || !groupId) {
            return
        }
        setFetching(true)
        const params = {
            idToken,
        }
        const queryParams = new URLSearchParams(params)
        const response = await fetch(`${BookmarkPath}/${groupId}?${queryParams}`)
        const json = await response.json() as {
            bookmarks : Bookmark[],
        }
        setBookmarks(json.bookmarks)
        setFetching(false)

    }, [groupId, idToken])
    const onClose = useCallback(async () => {
        await close({
            close: true,
        })
    }, [close])
    useEffect(() => {
        fetchBookmarks().catch(e => {
            console.error(e)
            setError('ブックマーク一覧の取得に失敗しました')
            setFetching(false)
        })
    }, [fetchBookmarks])

    return {
        bookmarks,
        error,
        fetching,
        onClose,
    }
}