import React from 'react'
import Presenter from './Presenter'
import { useBookmark, useMoveGroup } from '../../../../hooks/useBookmark'
import { useBookmarkGroup } from '../../../../hooks/useBookmarkGroup'
import { TextInput, TextArea } from '../../../Common/Input'
import { HeartButton } from '../../../Common/Button'
import Url from './Url'
import Refresh from './Refresh'
import Color from './Color'
import Move from './Move'
import Date from './Date'
import Image from './Image'

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
    const inputDisabled = status === 'loading'
    const title = <TextInput label='Title' disabled={inputDisabled} id='title' value={bookmark.title} handleSubmit={updateBookmark('title')} />
    const heart = <HeartButton
        aria-label='Likes'
        onClick={handleLikes}
        active={sentLikes}
        counter={likes.length > 0 && likes.length}
    />
    const description = <TextArea
        label='Description'
        id='description'
        disabled={inputDisabled}
        maxRows={4}
        value={bookmark.description}
        handleSubmit={updateBookmark('description')} />
    const comment = <TextArea label='ひとこと' id='comment' value={bookmark.comment} handleSubmit={updateBookmark('comment')} />
    const url = <Url url={bookmark.url} updateBookmark={updateBookmark} handleJumpLink={handleJumpLink}/>
    const refresh = <Refresh disabled={inputDisabled} handleRefetch={handleRefetch}/>
    const color = <Color color={bookmark.color} handleUpdate={updateBookmark('color')} group={group}/>
    const move = <Move {...moveGroupProps} copy={moveGroupProps.copyGroup} disabled={moveGroupProps.moveDest.id === bookmark.groupId}/>
    const date = <Date lastUpdate={bookmark.lastUpdate} created={bookmark.created} loading={status==='loading'}/>
    const image = <Image onChangeImage={updateBookmark('image')} images={bookmark.images} image={bookmark.image} loading={status==='loading'}/>
    return (
        <Presenter
            {
            ...{
                title,
                heart,
                description,
                bookmark,
                comment,
                likes,
                url,
                refresh,
                status,
                color,
                move,
                date,
                image
            }
            }
        />
    )
}

export default Container