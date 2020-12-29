import React from 'react'
import Presenter from './Presenter'
import { useBookmark, useMoveGroup } from '../../../../hooks/useBookmark'
import { useBookmarkGroup } from '../../../../hooks/useBookmarkGroup'

type Props = {
    bookmarkId: string
}

const Container: React.FC<Props> = ({
    bookmarkId
}) => {
    const {
        bookmark,
        likes,
        sentLikes,
        status,
        handleLikes,
        handleRefetch,
        updateBookmark,
        handleJumpLink,
    } = useBookmark(bookmarkId)
    const moveGroupProps = useMoveGroup(bookmark)
    const { group } = useBookmarkGroup(bookmark?.groupId)
    if (!bookmark) {
        return <div />
    }

    return (
        <Presenter
            {
            ...{
                bookmark,
                likes,
                sentLikes,
                status,
                group,
                handleLikes,
                handleRefetch,
                updateBookmark,
                handleJumpLink,
            }
            }
            {...moveGroupProps}
        />
    )
}

export default Container