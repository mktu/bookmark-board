import React, { useContext, useState, useEffect } from 'react'
import Layout from './Layout'
import ListItem from './ListItem'
import Input from './Input'
import Droppable from './Droppable'
import FirebaseContext from '../../../../context/FirebaseContext'
import { spliceAndInsert } from '../../../../logics'

type Props = {
    bookmarkIds: string[],
    group: BookmarkGroup
}

const Content: React.FC<Props> = ({
    bookmarkIds,
    group
}) => {
    const [hover, setHover] = useState(-1)
    const [checks, setChecks] = useState<{[key:string]:boolean}>({})
    const [input, setInput] = useState(false)
    const { clientService } = useContext(FirebaseContext)
    const onChangeOrder = (idx:number, target: string) => {
        const ordered = spliceAndInsert(bookmarkIds, idx, target)
        clientService.changeOrder(group.id, ordered)
    }
    return (
        <Layout
            refinements={<div>REFINEMENT</div>}
            bookmarkIds={bookmarkIds}
            renderBookmark={(b, idx) => {

                return (
                    <>
                        {idx === 0 && (<Droppable droppable={hover!=-1} onChangeOrder={(target)=>{
                            onChangeOrder(0, target)
                        }} open={hover === 0} />)}
                        <ListItem
                            setHover={setHover}
                            bookmarkId={b} />
                        <Droppable droppable={hover!=-1} onChangeOrder={(target)=>{
                            onChangeOrder(idx+1, target)
                        }} open={hover === idx + 1} />
                    </>
                )
            }}
            input={<Input groupId={group.id} toggle={setInput} show={input}/>}
        />
    )
}

export default Content