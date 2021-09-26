import React, { useContext } from 'react'
import { UrlImage } from '@components/Common/Avatar'
import { useRouter } from 'next/router'
import { Duplicate, Trash } from '@components/Common/Icon'
import EditFill from '@components/Common/Icon/EditFill'
import { SvgIconButton, SvgFillIconButton, HeartButton, ButtonBase } from '@components/Common/Button'
import { PopoverDivContainer } from '@components/Common/Popover'
import ColorSelector from '../ColorOption/Selector'
import { useRefinementById } from '@modules/groupRefinementSlice'
import { useProfile } from '@modules/profileSlice'
import { copyToClipBoard, numberToDateTime } from '@utils/index'
import { BookmarkListImageSize } from '@utils/constants'
import { toast } from 'react-toastify';
import { useBookmark } from '@hooks/useBookmark'
import { useBookmarkGroup } from '@hooks/useBookmarkGroup'
import { useHoverable } from '@hooks/useBookmarkDnd'
import BookmarkBulkContext from '@context/BookmarkBulkContext'
import Presenter from './Presenter'
import Checkbox from './Checkbox'

type Props = {
    bookmarkId: string,
    setHover: (idx: number) => void,
    idx: number,
}

const ListItem: React.FC<Props> = ({
    bookmarkId,
    setHover,
    idx,
}) => {
    const router = useRouter()
    const {
        bookmark,
        sentLikes,
        handleLikes,
        deleteBookmark,
        updateBookmarkImmediately
    } = useBookmark(bookmarkId)
    const { checkList, onCheck } = useContext(BookmarkBulkContext)
    const checked = checkList[bookmarkId]
    const profile = useProfile()
    const { group } = useBookmarkGroup(bookmark.groupId)
    const { listViewMask = [] } = useRefinementById(bookmark.groupId)
    const { dragging, attachDnDRef, opacity } = useHoverable(bookmark, idx, setHover, profile?.id === group?.owner)
    const colors = group?.colors || {}
    const color = colors[bookmark.color]?.color
    const handleJumpDetail = (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.stopPropagation()
        e.preventDefault()
        router.push(`/bookmarks/${bookmark.groupId}/${bookmark.id}`)
    }
    const handleCopyUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
        copyToClipBoard(bookmark.url, () => {
            toast.success('クリップボードにURLをコピーしました',)
        })
        e.stopPropagation()
        e.preventDefault()
    }
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        e.preventDefault()
        deleteBookmark()
    }
    const handleClickLikes = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        e.preventDefault()
        handleLikes()
    }
    const image = (
        <UrlImage
            className='rounded border border-primary-border'
            src={bookmark.image}
            enableEndpoint={!bookmark.disableEndpoint}
            width={BookmarkListImageSize}
            height={BookmarkListImageSize}
            name={bookmark.title} />
    )
    const copyButton = (
        <SvgIconButton aria-label='Copy URL' onClick={handleCopyUrl}>
            <Duplicate className='w-5' strokeWidth={1.5} />
        </SvgIconButton>)
    const editButton = (
        <SvgFillIconButton aria-label='Open URL in New Tab' onClick={handleJumpDetail}>
            <EditFill className='w-5 fill-primary-600' strokeWidth={1.5} />
        </SvgFillIconButton>
    )
    const deleteButton = (
        <SvgIconButton aria-label='Delete Bookmark' onClick={handleDelete}>
            <Trash className='w-5' strokeWidth={1.5} />
        </SvgIconButton>
    )
    const heartButton = (
        <HeartButton
            aria-label='Likes'
            size='w-4'
            active={sentLikes}
            onClick={handleClickLikes}
        />)

    const colorButton = (
        <PopoverDivContainer render={(toggle) => (
            <ColorSelector groupId={bookmark.groupId} handleSelectColor={(color) => {
                updateBookmarkImmediately('color')(color, () => {
                    toggle()
                })
            }} />
        )}>
            <ButtonBase className='text-xs text-primary-main underline' >色選択</ButtonBase>
        </PopoverDivContainer>
    )
    const checkButton = (
        <Checkbox onClick={() => {
            onCheck(bookmarkId, !checked)
        }}
            checked={checked}
            color={color}
        />
    )
    const origin = new URL(bookmark.url)
    return (
        <Presenter
            {...{
                attachDnDRef,
                dragging,
                image,
                opacity,
                linkUrl : bookmark.url,
                detailLink: `/bookmarks/${bookmark.groupId}/${bookmark.id}`,
                title: bookmark.title,
                description: !listViewMask.includes('description') && bookmark.description,
                hostname: !listViewMask.includes('url') && origin.host,
                comment: !listViewMask.includes('comment') && bookmark.comment,
                lastUpdate: !listViewMask.includes('lastUpdate') && numberToDateTime(bookmark.lastUpdate),
                copyIcon: copyButton,
                editIcon: editButton,
                deleteIcon: deleteButton,
                heartButton: heartButton,
                color,
                colorButton,
                checkButton
            }}
        />
    )
}

export default ListItem