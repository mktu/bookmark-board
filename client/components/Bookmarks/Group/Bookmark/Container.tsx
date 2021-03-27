import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import Presenter from './Presenter'
import { useBookmark, useMoveGroup } from '../../../../hooks/useBookmark'
import { useBookmarkGroup } from '../../../../hooks/useBookmarkGroup'
import TextInput from '../../../Common/Input/TextInput'
import TextArea from '../../../Common/Input/TextArea'
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
    const inputDisabled = status === 'loading'

    const title = useMemo(() => (
        <TextInput label='Title' disabled={inputDisabled} id='title' value={bookmark.title} onChange={(e)=>{updateBookmark('title')(e.target.value)}} />
    ), [inputDisabled, bookmark.title, updateBookmark])

    const heart = useMemo(() => (<HeartButton
        aria-label='Likes'
        onClick={handleLikes}
        active={sentLikes}
        counter={likes.length > 0 && likes.length}
    />), [handleLikes, sentLikes, likes.length])

    const description = useMemo(() => (
        <TextArea
            label='Description'
            id='description'
            disabled={inputDisabled}
            maxRows={4}
            value={bookmark.description}
            onChange={(e) => { updateBookmark('description')(e.target.value) }} />
    ), [inputDisabled, bookmark.description, updateBookmark])

    const comment = useMemo(() => (
        <TextArea label='ひとこと' id='comment' value={bookmark.comment} onChange={(e) => { updateBookmark('comment')(e.target.value) }} />
    ), [bookmark.comment, updateBookmark])

    const url = useMemo(() => (
        <Url url={bookmark.url} updateBookmark={updateBookmark} handleJumpLink={handleJumpLink} />
    ), [bookmark.url, updateBookmark, handleJumpLink])

    const refresh = useMemo(() => (
        <Refresh disabled={inputDisabled} handleRefetch={handleRefetch} />
    ), [inputDisabled, handleRefetch])

    const color = useMemo(() => (
        <Color color={bookmark.color} handleUpdate={updateBookmark('color')} group={group} />
    ), [bookmark.color, updateBookmark, group])

    const move = useMemo(() => (
        <Move {...moveGroupProps} copy={moveGroupProps.copyGroup} disabled={moveGroupProps.moveDest?.id === bookmark.groupId} />
    ), [moveGroupProps, bookmark.groupId])

    const date = useMemo(() => (
        <Date lastUpdate={bookmark.lastUpdate} created={bookmark.created} loading={status === 'loading'} />
    ), [bookmark.lastUpdate, bookmark.created, status])

    const image = useMemo(() => (
        <Image disableEndpoint={bookmark.disableEndpoint} onChangeImage={updateBookmark('image')} images={bookmark.images} image={bookmark.image} loading={status === 'loading'} />
    ), [bookmark.disableEndpoint, updateBookmark, bookmark.images, bookmark.image, status])

    const trash = useMemo(() => (
        <Trash handleDelete={() => {
            deleteBookmark().then(()=>{
                router.push(`/bookmarks/[[...ids]]`, `/bookmarks/${group.id}`, { shallow: true })
                toast.success('ブックマークを削除しました')
            })
        }} />
    ), [router, group.id, deleteBookmark])

    const submit = useMemo(() => (
        <ContainedButton className='text-sm' disabled={!hasChange} onClick={() => {
            handleSubmit(() => {
                onClose()
            })
        }}>更新</ContainedButton>
    ), [hasChange, handleSubmit, onClose])

    const cancel = useMemo(() => (
        <OutlinedButton className='text-sm' onClick={onClose}>戻る</OutlinedButton>
    ), [onClose])

    if (!bookmark?.id || !group?.id) {
        return <div />
    }
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