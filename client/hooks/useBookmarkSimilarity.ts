import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useProfile } from '@modules/profileSlice'
import { useGroups } from '@modules/groupSlice'
import { useBookmarks, useBookmarkStatus } from '@modules/bookmarkSlice'
import FirebaseContext from '@context/FirebaseContext'
import { numberToDate } from '@utils/date'

const useIgnoreList = (profileId?: string) => {
    const { clientService } = useContext(FirebaseContext)
    const [ignoreList, setIgnoreList] = useState<IgnoreSimilarity[]>([])
    const [loading,setLoading] = useState(true)
    const addIgnore = useCallback(async (bookmark: Bookmark, targetGroup: BookmarkGroup) => {
        if (!profileId) {
            return
        }
        if (ignoreList.some(i => i.bookmarkId === bookmark.id && i.targetGroupId === targetGroup.id)) {
            return
        }
        clientService.addIgnoreList(profileId, [{
            bookmarkId: bookmark.id,
            title: bookmark.title,
            image: bookmark.image,
            targetGroupId: targetGroup.id,
            targetGroupName: targetGroup.name,
            currentGroupId: bookmark.groupId
        }])
    }, [profileId, clientService, ignoreList])
    useEffect(() => {
        if (!profileId) {
            return
        }
        const unsubscribe = clientService.listenSimilarityIgnoreList(profileId, (added) => {
            setIgnoreList(b => b ? Array.from(
                new Map([...b, ...added].map(v => [v.id, v])).values()) : added)
            setLoading(false)
        }, (modified) => {
            setIgnoreList(b => b.map(v => {
                const found = modified.find(m => m.id === v.id)
                return found || v
            }))
        }, (deleted) => {
            setIgnoreList(b => b.filter(v => !deleted.some(d => d.id === v.id)))
        })

        return () => {
            unsubscribe()
        }
    }, [clientService, profileId])
    return {
        ignoreList,
        addIgnore,
        loading
    }
}

const useBookmarkSimilarity = (selectedBookmarkId?: string) => {
    const { clientService } = useContext(FirebaseContext)
    const profile = useProfile()
    const groups = useGroups()
    const bookmarks = useBookmarks()
    const bookmarkStatus = useBookmarkStatus()
    const { id: profileId } = profile || {}
    const { ignoreList, addIgnore, loading : loadingIgnoreList } = useIgnoreList(profileId)
    const [bookmarkSimilaritiesBase, setBookmarkSimilarities] = useState<BookmarkSimilarity[]>([])
    const [similarityBase, setSimilarity] = useState<Similarity>()
    const [loading,setLoading] = useState(true)
    const similarity = useMemo(() => similarityBase ? ({
        ...similarityBase,
        updated: numberToDate(similarityBase.updated * 1000)
    }) : undefined, [similarityBase])
    const bookmarkSimilaritiesBaseWithoutIgnoreList = useMemo(() =>
        bookmarkSimilaritiesBase.filter(b => !ignoreList.some(i => i.bookmarkId === b.bookmarkId && i.targetGroupId === b.targetGroupId)),
        [bookmarkSimilaritiesBase, ignoreList])
    const allFetched = !loading && !loadingIgnoreList && bookmarkStatus === 'loaded'
    const bookmarkSimilarities = useMemo(() => groups.map(g => ({
        groupId: g.id,
        groupName: g.name,
        similarities: bookmarkSimilaritiesBaseWithoutIgnoreList.filter(b => b.currentGroupId === g.id).map(b => ({
            ...b,
            targetGroup: groups.find(v => v.id === b.targetGroupId),
            bookmark: bookmarks.find(v => v.id === b.bookmarkId)
        })).filter(v=>Boolean(v.targetGroup) && Boolean(v.bookmark))
    })).filter(b => b.similarities.length > 0), [bookmarkSimilaritiesBaseWithoutIgnoreList, groups, bookmarks])
    const selectedBookmarkSimilarity = useMemo(() => {
        const found = bookmarkSimilaritiesBaseWithoutIgnoreList?.find(v => v.bookmarkId === selectedBookmarkId)
        if (!found) {
            return null
        }
        return {
            ...found,
            targetGroup: groups.find(v => v.id === found.targetGroupId),
            bookmark: bookmarks.find(v => v.id === found.bookmarkId),
            currentGroup: groups.find(v => v.id === found.currentGroupId),
        }
    }, [bookmarkSimilaritiesBaseWithoutIgnoreList, selectedBookmarkId, groups, bookmarks])

    const moveBookmark = useCallback(async (bookamrk:Bookmark, targetGroup:BookmarkGroup)=> {
        await clientService.moveGroupAsync([bookamrk], targetGroup.id)
    },[clientService])

    useEffect(() => {
        if (!profileId) {
            return
        }
        const unsubscribe = clientService.listenBookmarkSimilarities(profileId, (added) => {
            setBookmarkSimilarities(b => b ? Array.from(
                new Map([...b, ...added].map(v => [v.id, v])).values()) : added)
            setLoading(false)
        }, (modified) => {
            setBookmarkSimilarities(b => b.map(v => {
                const found = modified.find(m => m.id === v.id)
                return found || v
            }))
        }, (deleted) => {
            setBookmarkSimilarities(b => b.filter(v => !deleted.some(d => d.id === v.id)))
        })

        return () => {
            unsubscribe()
        }
    }, [clientService, profileId])

    useEffect(() => {
        profileId && clientService.getBookmarkSimilarity(profileId).then(v => { v && setSimilarity(v) })
    }, [clientService, profileId])

    return {
        bookmarkSimilarities,
        similarity,
        selectedBookmarkSimilarity,
        addIgnore,
        allFetched,
        moveBookmark
    }
}

export default useBookmarkSimilarity