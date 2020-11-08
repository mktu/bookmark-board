import React, { useMemo } from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import BookmarkContext, { ContextType } from '../../../context/BookmarkContext'
import useGroup from './useGroup'
import useBookmarks from './useBookmarks'

type Props = {
    children: React.ReactNode
}
const DefaultProvider: React.FC<Props> = ({ children }) => {
    const bookmarkServices = useBookmarks()
    useGroup(bookmarkServices)

    const value = useMemo<ContextType>(() => ({
        bookmarkServices,
    }), [bookmarkServices])

    return (
        <DndProvider backend={HTML5Backend}>
            <BookmarkContext.Provider value={value}>
                {children}
            </BookmarkContext.Provider>
        </DndProvider>

    )
}

export default DefaultProvider