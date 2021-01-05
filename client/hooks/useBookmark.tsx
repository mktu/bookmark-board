import { useContext, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useBookmarkById } from '../modules/bookmarkSlice'
import { useGroupsByUser } from '../modules/groupSlice'
import { useProfile } from '../modules/profileSlice'
import FirebaseContext from '../context/FirebaseContext'
import { fetchFromServer } from '../logics/fetchLinkPreview'

export const useMoveGroup = (bookmark:Bookmark)=>{
    const profile = useProfile()
    const router = useRouter()
    const groups = useGroupsByUser(profile.id)
    const { clientService } = useContext(FirebaseContext)
    const [copyGroup,setCopyGroup] = useState(false)
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
        handleCheckCopy:setCopyGroup,
        handleMove,
        handleSelectMoveDest
    }
}

export const useBookmark = (bookmarkId:string)=>{
    const profile = useProfile()
    const bookmark = useBookmarkById(bookmarkId)
    const { clientService } = useContext(FirebaseContext)
    const [status, setStatus] = useState<LoadStatus['status']>('loaded')
    const updateBookmark = useCallback((key: keyof Bookmark) => (value: string) => {
        clientService.modifyBookmark(bookmark.groupId, bookmark.id, {
            [key]: value
        })
    },[bookmark,clientService])
    const deleteBookmark = useCallback(()=>{
        clientService.deleteBookmark(bookmark.groupId, bookmark.id)
    },[bookmark,clientService])
    const likes = bookmark?.reactions['likes'] || []
    const sentLikes = likes.includes(profile.id)
    const handleRefetch = useCallback(() => {
        setStatus('loading')
        fetchFromServer(bookmark.url).then(result => {
            clientService.modifyBookmark(bookmark.groupId, bookmark.id, {
                title: result.title,
                description: result.description || '',
                image: result.images.length > 0 && result.images[0]
            }, () => {
                setStatus('loaded')
            }, (err) => {
                setStatus('failed')
                console.error(err)
            })
        })
    },[clientService,bookmark])
    const handleLikes = useCallback(() => {
        clientService.modifyBookmark(bookmark.groupId, bookmark.id, {
            reactions: {
                ...bookmark.reactions,
                likes: sentLikes ? likes.filter(t => t !== profile.id) : Array.from(new Set([...likes, profile.id]))
            }
        })
    },[clientService,bookmark,sentLikes,likes,profile])

    const handleJumpLink = useCallback(() => {
        window && window.open(
            bookmark.url,
            '_blank'
        );
    },[bookmark])

    return {
        bookmark,
        likes,
        sentLikes,
        status,
        handleLikes,
        handleRefetch,
        updateBookmark,
        deleteBookmark,
        handleJumpLink,
    }
}