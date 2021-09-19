import { useState, useContext, useCallback, useRef, useEffect, useMemo } from 'react'
import FirebaseContext from '../context/FirebaseContext'
import { MaxBookmarkNumber } from '../utils/constants'
import { useBookmarksByGroup } from '../modules/bookmarkSlice'
import { useLinkPreview } from '../components/Common/LinkPreview'
import { toast } from 'react-toastify';

const useNewBookmark = (groupId : string) => {
    const unmounted = useRef(false)
    const bookmarks = useBookmarksByGroup(groupId)
    const [bookmarkInput, setBookmarkInput] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const { linkData, url, status } = useLinkPreview({ text: bookmarkInput })
    const dupulicated = useMemo(()=>Boolean(bookmarks.find(v=>v.url===url)),[url,bookmarks])
    const reachedLimit = useMemo(() => MaxBookmarkNumber <= bookmarks.length, [bookmarks.length])
    const invalidUrl = status === 'none' && Boolean(bookmarkInput)
    const error = useMemo(() => {
        if(submitting){
            return ''
        }
        if (reachedLimit) {
            return `1グループに登録できるブックマークの上限(${MaxBookmarkNumber})を超えています.`
        }
        if (status === 'failed' || invalidUrl) {
            return '無効なURLです'
        }
        if(dupulicated){
            return 'すでに登録されているブックマークです'
        }
        return ''
    }, [status, invalidUrl, reachedLimit, dupulicated, submitting])
    const { clientService } = useContext(FirebaseContext)
    useEffect(() => {
        unmounted.current = false
        return () => {
            unmounted.current = true
        }
    }, [])
    const onChangeBookmarkInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setBookmarkInput(e.target.value)
    }, [])
    const submit = useCallback(()=> new Promise<string>((resolve) => {
        if (error || !url || !groupId) return
        setSubmitting(true)
        const hasLinkData = Boolean(linkData)
        let data;
        if (hasLinkData) {
            data = {
                url,
                title: linkData.title,
                image: linkData.images.length > 0 && linkData.images[0],
                images: linkData.images,
                description: linkData.description || '',
                neighbors: [],
                groupId,
                reactions: {},
            }
        }
        else {
            data = {
                url,
                title : url,
                neighbors: [],
                groupId,
                images: [],
                reactions: {},
                unacquired: true
            }
        }
        clientService.addBookmark(data, (bookmarkId) => {
            if(!unmounted.current){
                setBookmarkInput('')
                setSubmitting(false)
            }
            resolve(bookmarkId)
            if (!hasLinkData) {
                clientService.completeBookmark(url, groupId, bookmarkId, true).catch(() => {
                    toast.error('Bookmark情報の自動付与に失敗しました')
                })
            } else if (!data.image) {
                clientService.completeBookmark(url, groupId, bookmarkId).catch(() => {
                    toast.error('Bookmark画像の取得に失敗しました')
                })
            }
        })
    }), [clientService, url, linkData, groupId, error])

    const onKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            submit()
            e.preventDefault()
        }
    }, [submit])

    return {
        status,
        url,
        linkData,
        bookmarkInput,
        error,
        submit,
        setBookmarkInput,
        onChangeBookmarkInput,
        onKeyPress
    }
}

export default useNewBookmark

