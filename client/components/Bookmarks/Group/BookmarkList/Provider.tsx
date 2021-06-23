import { ReactNode, VFC } from "react";
import useBookmarkBulkOperation from '@hooks/useBookmarkBulkOperation'
import BookmarkBulkContext from '@context/BookmarkBulkContext'

type Props = {
    bookmarkIds: string[],
    groupId:string,
    children:ReactNode
}

const Provider : VFC<Props> = ({
    bookmarkIds,
    groupId,
    children
})=>{
    const contextValue = useBookmarkBulkOperation(groupId,bookmarkIds)
    return (
        <BookmarkBulkContext.Provider value={contextValue}>
            {children}
        </BookmarkBulkContext.Provider>
    )
}

export default Provider