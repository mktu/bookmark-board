import React, { useMemo } from 'react'
import Presenter from './Presenter'
import { useGroupsByUser } from '@modules/groupSlice'
import { useProfile } from '@modules/profileSlice'
import { useBookmarks } from '@modules/bookmarkSlice'
import BookmarkListItem from './BookmarkListItem'
import ShowMore from '../RecentList/ShowMore'

const Container: React.FC = () => {
    const profile = useProfile()
    const groups = useGroupsByUser(profile.id)
    const bookmarks = useBookmarks()
    const recentCreated = useMemo(()=> bookmarks.sort((a, b) => {
        return b.created - a.created
    }).slice(0, 5).map(v=>(
        <BookmarkListItem bookmark={v} key={v.id}/>
    )), [bookmarks])
    return <Presenter
        userName={profile.name}
        groups={groups.length}
        bookmarks={bookmarks.length}
        recentCreated={recentCreated}
        showMore={<ShowMore />}
    />
}

export default Container