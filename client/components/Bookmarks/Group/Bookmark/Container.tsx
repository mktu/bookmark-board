import React from 'react'
import Presenter from './Presenter'
import { useBookmark, useMoveGroup } from '../../../../hooks/useBookmark'

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