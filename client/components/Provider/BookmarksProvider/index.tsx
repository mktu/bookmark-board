import React, { useMemo } from 'react'
import BookmarkContext, { ContextType } from '../../../context/BookmarkContext'
import useGroup from './useGroup'
import useBookmarks from './useBookmarks'

type Props = {
    children: React.ReactNode
}
const DefaultProvider: React.FC<Props> = ({ children }) => {
    const bookmarkServices = useBookmarks()
    useGroup(bookmarkServices)

    const value = useMemo<ContextType>(()=>({
        bookmarkServices,
    }),[bookmarkServices])
    
    return (
        <BookmarkContext.Provider value={value}>
            {children}
        </BookmarkContext.Provider>
    )
}

export default DefaultProvider