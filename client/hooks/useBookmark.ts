import { useContext, useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useBookmarkById, initialBookmark } from '../modules/bookmarkSlice'
import { useGroupsByUser } from '../modules/groupSlice'
import { useProfile } from '../modules/profileSlice'
import FirebaseContext from '../context/FirebaseContext'

export const useMoveGroup = (bookmark: Bookmark) => {
    const profile = useProfile()
    const router = useRouter()
    const groups = useGroupsByUser(profile.id)
    const { clientService } = useContext(FirebaseContext)
    const [copyGroup, setCopyGroup] = useState(false)
    const group = groups.find(g => bookmark && g.id === bookmark.groupId)
    const [moveDest, setMoveDest] = useState(group)
    const handleMove = () => {
        clientService.moveGroup(bookmark, moveDest.id, () => {
            router.push(`/bookmarks/[[...ids]]`, `/bookmarks/${group.id}`, { shallow: true })
        }, copyGroup)
    }

    const handleSelectMoveDest = (s: string) => {
        setMoveDest(groups.find(g => g.id === s))
    }

    return {
        moveDest,
        copyGroup,
        groups,
        handleCheckCopy: setCopyGroup,
        handleMove,
        handleSelectMoveDest
    }
}

export const useBookmark = (bookmarkId: string) => {
    const profile = useProfile()
    const base = useBookmarkById(bookmarkId)
    const [update, setUpdate] = useState<Partial<Bookmark>>({})
    const bookmark = useMemo(()=>({
        ...initialBookmark,
        ...base,
        ...update
    }),[base,update])
    const { clientService } = useContext(FirebaseContext)
    const [status, setStatus] = useState<LoadStatus['status']>('loaded')
    const updateBookmark = useCallback((key: keyof Bookmark) => (value: string) => {
        setUpdate(before => ({ ...before, ...{ [key]: value } }))
    }, [])
    const updateBookmarkImmediately = useCallback((key: keyof Bookmark) => (value: string, notify: Notifier) => {
        clientService.modifyBookmark(base.groupId, base.id, {
            [key]:value
        }, notify)
    }, [clientService,base])
    const deleteBookmark = useCallback(() => new Promise<void>((resolve)=>{
        clientService.deleteBookmark(bookmark.groupId, bookmark.id, resolve)
    }), [bookmark, clientService])
    const likes = useMemo(()=>bookmark?.reactions?.likes || [],[bookmark?.reactions?.likes])
    const sentLikes = likes.includes(profile.id)
    const handleRefetch = useCallback(() => {
        setStatus('loading')
        clientService.scrapeUrl(bookmark.url, true, true).then(result => {
            setUpdate(before => ({
                ...before,
                title: result.title,
                description: result.description || '',
                image: result.images.length > 0 ? result.images[0] : '',
                images: result.images,
                disableEndpoint: false
            }))
            setStatus('loaded')
        })
            .catch((err) => {
                setStatus('failed')
                console.error(err)
            })
    }, [clientService, bookmark?.url])
    const handleLikes = useCallback(() => {
        clientService.modifyBookmark(bookmark.groupId, bookmark.id, {
            reactions: {
                ...bookmark.reactions,
                likes: sentLikes ? likes.filter(t => t !== profile.id) : Array.from(new Set([...likes, profile.id]))
            }
        })
    }, [clientService, bookmark, sentLikes, likes, profile])

    const handleJumpLink = useCallback(() => {
        window && window.open(
            bookmark.url,
            '_blank'
        );
    }, [bookmark?.url])

    const handleLoadImageError = useCallback((disableEndpoint?: boolean) => {
        if (disableEndpoint) {
            clientService.modifyBookmark(bookmark.groupId, bookmark.id, {
                disableEndpoint
            })
            return
        }
        const current = bookmark.image
        const left = bookmark.images.filter(img => img !== current) || []
        const next = left.length > 0 ? left[0] : ''
        clientService.modifyBookmark(bookmark.groupId, bookmark.id, {
            image: next,
            images: left
        })
    }, [bookmark,clientService])

    const hasChange = Object.keys(update).length > 0
    const handleSubmit = useCallback((notify: Notifier) => {
        hasChange && clientService.modifyBookmark(bookmark.groupId, bookmark.id, update, notify)
    }, [hasChange, bookmark?.groupId, bookmark?.id, update, clientService])

    return {
        bookmark,
        likes,
        sentLikes,
        status,
        hasChange,
        handleLikes,
        handleRefetch,
        updateBookmark,
        updateBookmarkImmediately,
        deleteBookmark,
        handleJumpLink,
        handleLoadImageError,
        handleSubmit
    }
}