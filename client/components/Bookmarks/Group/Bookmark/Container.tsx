import React from 'react'
import { useRouter } from 'next/router'
import Presenter from './Presenter'
import { useBookmark, useMoveGroup } from '../../../../hooks/useBookmark'
import { useBookmarkGroup } from '../../../../hooks/useBookmarkGroup'
import { TextInput, TextArea } from '../../../Common/Input'
import { HeartButton, ContainedButton, OutlinedButton } from '../../../Common/Button'
import Url from './Url'
import Refresh from './Refresh'
import Color from './Color'
import Move from './Move'
import Date from './Date'
import Image from './Image'
import Trash from './Trash'

type Props = {
    bookmarkId: string,
    onClose: () => void
}

const Container: React.FC<Props> = ({
    bookmarkId,
    onClose
}) => {
    const router = useRouter()
    const {
        bookmark,
        likes,
        sentLikes,
        status,
        hasChange,
        handleLikes,
        handleRefetch,
        updateBookmark,
        handleJumpLink,
        deleteBookmark,
        handleSubmit
    } = useBookmark(bookmarkId)
    const moveGroupProps = useMoveGroup(bookmark)
    const { group } = useBookmarkGroup(bookmark?.groupId)
    if (!bookmark || !bookmark.id || !group) {
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
    const move = <Move {...moveGroupProps} copy={moveGroupProps.copyGroup} disabled={moveGroupProps.moveDest?.id === bookmark.groupId}/>
    const date = <Date lastUpdate={bookmark.lastUpdate} created={bookmark.created} loading={status==='loading'}/>
    const image = <Image disableEndpoint={bookmark.disableEndpoint} onChangeImage={updateBookmark('image')} images={bookmark.images} image={bookmark.image} loading={status==='loading'}/>
    const trash = <Trash handleDelete={()=>{deleteBookmark(()=>{
        router.push(`/bookmarks/[[...ids]]`, `/bookmarks/${group.id}`, { shallow: true })
    })}}/>
    const submit = <ContainedButton className='text-sm' disabled={!hasChange} onClick={()=>{handleSubmit(()=>{
        onClose()
    })}}>更新</ContainedButton>
    const cancel = <OutlinedButton className='text-sm' onClick={onClose}>キャンセル</OutlinedButton>
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
                image,
                trash,
                submit,
                cancel
            }
            }
        />
    )
}

export default Container