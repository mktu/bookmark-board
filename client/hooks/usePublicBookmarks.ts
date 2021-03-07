import { useContext, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import useReactionListener from '@hooks/useReactionListener'
import { useProfile } from '@modules/profileSlice'
import FirebaseContext from '@context/FirebaseContext'
import useInterval from './useInterval'

const usePublicBookmarks = (group:BookmarkGroup, bookmarks:Bookmark[]) => {
    const profile = useProfile()
    const router = useRouter()
    const { clientService } = useContext(FirebaseContext)
    const { start, waiting } = useInterval()
    const { reactions, status, getReactionByUid } = useReactionListener(group.id, 'likes')
    const myReaction = getReactionByUid(profile.id)
    const definedColors = useMemo(() => group.colors ? Object.keys(group.colors).sort((a, b) => {
        return group.colors[a].idx - group.colors[b].idx
    }) : [], [group])
    const independents = useMemo(() => bookmarks.filter(b => !definedColors.includes(b.color)), [definedColors, bookmarks])
    const hasColor = independents.length !== bookmarks.length && definedColors.length > 0
    const handleLogin = useCallback(() => {
        router.push('/signin')
    }, [router])
    const handleLike = useCallback(() => {
        if(waiting){
            return
        }
        start(1000)
        myReaction ? clientService.deleteReaction(group.id, myReaction.id) :
            clientService.addReaction({
                type: 'likes',
                targetId: group.id
            })
    }, [clientService, myReaction, group, start, waiting])
    const enableLike = (status !== 'loading' && profile.id && !waiting)
    return {
        reactions,
        status,
        hasColor,
        independents,
        myReaction,
        profile,
        definedColors,
        enableLike,
        handleLogin,
        handleLike
    }
}

export default usePublicBookmarks