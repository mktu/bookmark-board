import React, { useState, useContext, useMemo } from 'react'
import FirebaseContext from '@context/FirebaseContext'
import { useProfile } from '@modules/profileSlice'
import { useGroupsByUser } from '@modules/groupSlice'
import { useBookmarks, useBookmarkStatus } from '@modules/bookmarkSlice'
import { spliceAndInsert } from '../../../logics'
import ListItem from './ListItem'
import Presenter from './Presenter'
import Droppable from './Droppable'
import Refinements from './Refinements'
import NewGroup, { Dialog as NewGroupDialog } from './NewGroup'
import SearchFilter from './SearchFilter'

const Container: React.FC = () => {
    const [hover, setHover] = useState(-1)
    const [showNewGroup, setShowNewGroup] = useState(false)
    const { clientService } = useContext(FirebaseContext)
    const profile = useProfile()
    const groupsBase = useGroupsByUser(profile.id)
    const [searchText, setSearchText] = useState('')
    const bookmarks = useBookmarks()
    const bookmarkLoadStatus = useBookmarkStatus()
    const groups = useMemo(() => groupsBase.map(v => ({
        ...v,
        bookmarkCount: bookmarks.filter(b => b.groupId === v.id).length
    })), [groupsBase, bookmarks])

    const onChangeOrder = (next: number) => (id: string) => {
        const ordered = spliceAndInsert(groups.map(g => g.id), next, id)
        clientService.changeGroupOrder(ordered)
    }
    const onCloseNewGroup = () => {
        setShowNewGroup(false)
    }
    const groupList = groups.filter(v => !searchText || v.name.toLowerCase().includes(searchText.toLowerCase())).map((group, idx) => {
        return (
            <React.Fragment key={group.id}>
                {idx === 0 && (
                    <Droppable droppable={!searchText && hover != -1} onChangeOrder={onChangeOrder(0)} open={hover === 0} />
                )}
                <ListItem bookmarkLoaded={bookmarkLoadStatus === 'loaded'} bookmarkGroup={group} onHover={setHover} listIndex={idx} />
                <Droppable droppable={!searchText && hover != -1} onChangeOrder={onChangeOrder(idx + 1)} open={hover === idx + 1} />
            </React.Fragment>
        )
    })

    const refinements = useMemo(() => (
        <Refinements
            searchWord={searchText}
            onChangeSearchWord={setSearchText}
            onClickNewGroup={() => { setShowNewGroup(true) }} />
    ), [searchText])

    const searchFilter = useMemo(() => (
        <SearchFilter searchWord={searchText} onClear={() => {
            setSearchText('')
        }} />
    ), [searchText])

    return (
        <>
            <Presenter

                {...{
                    groupList,
                    refinements,
                    searchFilter
                }}
            />
            <NewGroupDialog open={showNewGroup} onClose={onCloseNewGroup}>
                <NewGroup onClose={onCloseNewGroup} />
            </NewGroupDialog>
        </>
    )
}

export default Container