import React, {useEffect} from 'react'
import { useBookmarkIdsByGroup } from '../../../modules/bookmarkSlice'
import { useRouter } from 'next/router'
import NoItem from './NoItem'
import Layout from './Layout'
import Header from './Header'
import BookmarkList from './BookmarkList'
import Bookmark, { Dialog } from './Bookmark'

type Props = {

}
const Group: React.FC<Props> = () => {
    const router = useRouter()
    
    const { ids } = router.query
    const groupId = ids && ids.length > 0 ? ids[0] : ''
    const bookmarkId = ids && ids.length > 1 ? ids[1] : ''
    const bookmarkIds = useBookmarkIdsByGroup(groupId)

    useEffect(()=>{
        if(!localStorage){
            return
        }
        if(groupId){
            localStorage.setItem('groupId', groupId)
        } else {
            const lastGroupId = localStorage.getItem('groupId')
            if(lastGroupId){
                router.replace(`/bookmarks/[[...ids]]`, `/bookmarks/${lastGroupId}`, { shallow: true })
            }
        }
    },[groupId])

    if (!groupId) {
        return <div />
    }
    if (bookmarkIds.length == 0) {
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