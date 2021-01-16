import React, {useEffect} from 'react'
import { useBookmarkIdsByRefinements } from '../../../modules/bookmarkSlice'
import { useGroupById, useGroupStatus } from '../../../modules/groupSlice'
import { useRefinementById } from '../../../modules/groupRefinementSlice'
import { useRouter } from 'next/router'
import NoItem from './NoItem'
import Layout from './Layout'
import Header from './Header'
import BookmarkList from './BookmarkList'
import Bookmark, { Dialog } from './Bookmark'

type Props = {
    groupId: string,
    bookmarkId: string
}
const Group: React.FC<Props> = ({
    groupId,
    bookmarkId
}) => {
    const router = useRouter()
    const group = useGroupById(groupId)
    const refinements = useRefinementById(groupId)
    const hasFilter = refinements?.colorMasks?.length > 0 || false
    const bookmarkIds = useBookmarkIdsByRefinements(refinements)
    const status = useGroupStatus()

    useEffect(()=>{
        if(!localStorage){
            return
        }
        if(!groupId){
            const lastGroupId = localStorage.getItem('groupId')
            if(lastGroupId){
                router.replace(`/bookmarks/[[...ids]]`, `/bookmarks/${lastGroupId}`, { shallow: true })
                localStorage.removeItem('groupId')
            }
            return
        }
        if(status === 'loading'){
            return
        }
        if(!group){
            router.replace(`/bookmarks`, `/bookmarks`, { shallow: true })
            return
        }
        localStorage.setItem('groupId', group.id)
    },[group, status, groupId])

    if (!groupId) {
        return <div />
    }
    if (bookmarkIds.length == 0 && ! hasFilter) {
        return (
            <Layout
                header={<Header groupId={groupId} />}
                contents={<NoItem groupId={groupId} />}
            />
        )
    }
    return (
        <>
            <Layout
                header={<Header groupId={groupId} />}
                contents={<BookmarkList bookmarkIds={bookmarkIds} groupId={groupId} />}
            />
            <Dialog open={Boolean(bookmarkId)} onClose={() => {
                router.push(`/bookmarks/[[...ids]]`, `/bookmarks/${groupId}`, { shallow: true })
            }}>
                <Bookmark bookmarkId={bookmarkId} />
            </Dialog>
            
        </>
    )
}

export default Group