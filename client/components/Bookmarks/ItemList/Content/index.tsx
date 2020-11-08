import React, { useContext, useState } from 'react'
import Layout from './Layout'
import ListItem from './ListItem'
import Input from './Input'
import Droppable from './Droppable'
import FirebaseContext from '../../../../context/FirebaseContext'
import { spliceAndInsert } from '../../../../logics'

type Props = {
    bookmarks: Bookmark[],
    group: BookmarkGroup
}

const Content: React.FC<Props> = ({
    bookmarks,
    group
}) => {
    const [hover, setHover] = useState(-1)
    const { clientService } = useContext(FirebaseContext)
    const onChangeOrder = (idx:number, target: string) => {
        const ordered = spliceAndInsert(bookmarks.map(b => b.id), idx, target)
        clientService.changeOrder(group.id, ordered)
    }
    return (
        <Layout
            refinements={<div>REFINEMENT</div>}
            bookmarks={bookmarks}
            renderBookmark={(b, idx) => {

                return (
                    <>
                        {idx === 0 && (<Droppable droppable={hover!=-1} onChangeOrder={(target)=>{
                            onChangeOrder(0, target)
                        }} open={hover === 0} />)}
                        <ListItem
                            setHover={setHover}
                            bookmark={b} />
                        <Droppable droppable={hover!=-1} onChangeOrder={(target)=>{
                            onChangeOrder(idx+1, target)
                        }} open={hover === idx + 1} />
                    </>
                )
            }}
            input={<Input groupId={group.id} />}
        />
    )
}

export default Content