import React, { useContext, useState } from 'react'
import Layout from './Layout'
import ListItem, { Fallback } from './ListItem'
import Input from './Input'
import Droppable from './Droppable'
import Refinements from './Refinements'
import useBookmarkBulkOperation from '@hooks/useBookmarkBulkOperation'
import FirebaseContext from '@context/FirebaseContext'
import BookmarkBulkContext from '@context/BookmarkBulkContext'
import { spliceAndInsert } from '../../../../logics'
import ErrorBoundary from '../../../Common/ErrorBoundary'

type Props = {
    bookmarkIds: string[],
    groupId: string
}

const BookmarkList: React.FC<Props> = ({
    bookmarkIds,
    groupId
}) => {
    const [hover, setHover] = useState(-1)
    const [input, setInput] = useState(true)
    const contextValue = useBookmarkBulkOperation(groupId,bookmarkIds)
    const { clientService } = useContext(FirebaseContext)
    const onChangeOrder = (idx: number, target: string) => {
        const ordered = spliceAndInsert(bookmarkIds, idx, target)
        clientService.changeOrder(groupId, ordered)
    }
    return (
        <BookmarkBulkContext.Provider value={contextValue}>
            <Layout
                refinements={<Refinements groupId={groupId} />}
                bookmarkIds={bookmarkIds}
                renderBookmark={(b, idx) => {
                    return (
                        <>
                            {idx === 0 && (<Droppable height={2.5} droppable={hover != -1} onChangeOrder={(target) => {
                                onChangeOrder(0, target)
                            }} open={hover === 0} />)}
                            <ErrorBoundary fallback={<Fallback />}>
                                <ListItem
                                    setHover={setHover}
                                    bookmarkId={b}
                                    idx={idx} />
                            </ErrorBoundary>
                            <Droppable droppable={hover != -1} onChangeOrder={(target) => {
                                onChangeOrder(idx + 1, target)
                            }} open={hover === idx + 1} />
                        </>
                    )
                }}
                input={<Input groupId={groupId} toggle={setInput} show={input} />}
            />
        </BookmarkBulkContext.Provider>

    )
}

export default BookmarkList