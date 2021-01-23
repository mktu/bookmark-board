import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useGroupStatus } from '../modules/groupSlice'

const useBookmarkRouteRedirect = (groupRouteId?:string, group?:BookmarkGroup)=>{
    const router = useRouter()
    const status = useGroupStatus()
    useEffect(() => {
        if (!localStorage) {
            return
        }
        if (!groupRouteId) {
            const lastGroupId = localStorage.getItem('groupId')
            if (lastGroupId) {
                router.replace(`/bookmarks/[[...ids]]`, `/bookmarks/${lastGroupId}`, { shallow: true })
                localStorage.removeItem('groupId')
            }
            return
        }
        if (status === 'loading') {
            return
        }
        if (!group) {
            router.replace(`/bookmarks`, `/bookmarks`, { shallow: true })
            return
        }
        localStorage.setItem('groupId', group.id)
    }, [group, status, groupRouteId])
}

export default useBookmarkRouteRedirect