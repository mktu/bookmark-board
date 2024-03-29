import React, { useMemo, useEffect } from 'react'
import { useRouter } from 'next/router'
import Presenter from './Presenter'
import Placeholder from './Placeholder'
import NotFound from './NotFound'
import { useBookmark } from '@hooks/useLiffBookmark'
import TextInput from '@components/Common/Input/TextInput'
import TextArea from '@components/Common/Input/TextArea'
import { ContainedButton, OutlinedButton } from '@components/Common/Button'
import Url from '@components/Bookmarks/Group/Bookmark/Url'
import Refresh from '@components/Bookmarks/Group/Bookmark/Refresh'
import Color from '@components/Bookmarks/Group/Bookmark/Color'
import Date from '@components/Bookmarks/Group/Bookmark/Date'
import Image from '@components/Bookmarks/Group/Bookmark/Image'

type Props = {
    groupId : string, 
    bookmarkId : string
}

const handleJumpLink = (url:string)=>{
    window && window.open(
        url
    )
}

const Container: React.FC<Props> = ({
    groupId,
    bookmarkId
}) => {
    const router = useRouter()
    const {
        bookmark,
        error,
        colors,
        hasChange,
        fetching,
        posting,
        candidates,
        clientType,
        updateBookmark,
        submitBookmark,
        onClose
    } = useBookmark(groupId, bookmarkId)
    const inputDisabled = fetching || posting

    useEffect(()=>{
        if(clientType === 'other' && groupId && bookmarkId){
            router.push(`/bookmarks/${groupId}/${bookmarkId}`)
        }
    },[clientType, router, groupId, bookmarkId])

    const title = useMemo(() => (
        <TextInput label='Title' disabled={inputDisabled} id='title' value={bookmark.title} onChange={(e) => { updateBookmark('title')(e.target.value) }} />
    ), [inputDisabled, bookmark.title, updateBookmark])


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
        <Url url={bookmark.url} updateBookmark={updateBookmark} handleJumpLink={()=>{
            handleJumpLink(bookmark.url)
        }} />
    ), [bookmark.url, updateBookmark])

    const refresh = useMemo(() => (
        <Refresh disabled={inputDisabled} handleRefetch={()=>{
            // TBD
        }} />
    ), [inputDisabled])

    const color = useMemo(() => (
        <Color color={bookmark.color} handleUpdate={updateBookmark('color')} colors={colors} />
    ), [bookmark.color, updateBookmark, colors])


    const date = useMemo(() => (
        <Date lastUpdate={bookmark.lastUpdate} created={bookmark.created} loading={fetching} />
    ), [bookmark.lastUpdate, bookmark.created, fetching])

    const image = useMemo(() => (
        <Image disableEndpoint={bookmark.disableEndpoint} onChangeImage={updateBookmark('image')} images={bookmark.images} image={bookmark.image} loading={fetching} />
    ), [bookmark.disableEndpoint, updateBookmark, bookmark.images, bookmark.image, fetching])


    const submit = useMemo(() => (
        <ContainedButton className='text-sm' disabled={!hasChange} onClick={async () => {
            await submitBookmark()
        }}>更新</ContainedButton>
    ), [hasChange, submitBookmark])


    const cancel = useMemo(() => (
        <OutlinedButton className='text-sm' onClick={onClose}>閉じる</OutlinedButton>
    ), [onClose])

    if(error){
        return <NotFound message={error} candidates={candidates}/>
    }
    if (fetching || !bookmark || !bookmark?.url) {
        return <Placeholder />
    }
    return (
        <Presenter
            {
            ...{
                title,
                description,
                bookmark,
                comment,
                url,
                refresh,
                color,
                date,
                image,
                submit,
                cancel,
            }
            }
        />
    )
}

export default Container