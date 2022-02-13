import React, { useState, useContext, useMemo } from 'react'
import FirebaseContext from '@context/FirebaseContext'
import { useProfile } from '@modules/profileSlice'
import { useGroupsByUser } from '@modules/groupSlice'
import { useBookmarks } from '@modules/bookmarkSlice'
import { spliceAndInsert } from '../../../logics'
import ListItem from './ListItem'
import Presenter from './Presenter'
import Droppable from './Droppable'
import Refinements from './Refinements'
import NewGroup, { Dialog as NewGroupDialog } from './NewGroup'

const Container: React.FC = () => {
    const [hover, setHover] = useState(-1)
    const [showNewGroup, setShowNewGroup] = useState(false)
    const { clientService } = useContext(FirebaseContext)
    const profile = useProfile()
    const groupsBase = useGroupsByUser(profile.id)
    const bookmarks = useBookmarks()
    const groups = useMemo(()=>groupsBase.map(v=>({
        ...v,
        bookmarkCount : bookmarks.filter(b=>b.groupId === v.id).length
    })),[groupsBase, bookmarks])

    const onChangeOrder = (next: number) => (id: string) => {
        const ordered = spliceAndInsert(groups.map(g => g.id), next, id)
        clientService.changeGroupOrder(ordered)
    }
    const onCloseNewGroup = () => {
        setShowNewGroup(false)
    }
    const groupList = groups.map((group, idx) => {
        return (
            <React.Fragment key={group.id}>
                {idx === 0 && (
                    <Droppable droppable={hover != -1} onChangeOrder={onChangeOrder(0)} open={hover === 0} />
                )}
                <ListItem bookmarkGroup={group} onHover={setHover} listIndex={idx} />
                <Droppable droppable={hover != -1} onChangeOrder={onChangeOrder(idx + 1)} open={hover === idx + 1} />
            </React.Fragment>
        )
    })

    const refinements = (
        <Refinements onClickNewGroup={() => { setShowNewGroup(true) }} />
    )
    return (
        <>
            <Presenter
                {...{
                    groupList,
                    refinements
                }}
            />
            <NewGroupDialog open={showNewGroup} onClose={onCloseNewGroup}>
                <NewGroup onClose={onCloseNewGroup}/>
            </NewGroupDialog>
        </>
    )
}

export default Container