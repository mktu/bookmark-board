import React, { useContext } from 'react'
import { UrlImage } from '@components/Common/Avatar'
import { ExternalLink, Duplicate, Trash } from '@components/Common/Icon'
import { SvgIconButton, HeartButton, ButtonBase } from '@components/Common/Button'
import { PopoverDivContainer } from '@components/Common/Popover'
import ColorSelector from '../ColorOption/Selector'
import { useRefinementById } from '@modules/groupRefinementSlice'
import { useProfile } from '@modules/profileSlice'
import { copyToClipBoard } from '@utils/index'
import { BookmarkListImageSize } from '@utils/constants'
import { toast } from 'react-toastify';
import { useBookmark } from '@hooks/useBookmark'
import { useBookmarkGroup } from '@hooks/useBookmarkGroup'
import { useHoverable } from '@hooks/useBookmarkDnd'
import BookmarkBulkContext from '@context/BookmarkBulkContext'
import Presenter from './Presenter'
import Checkbox from './Checkbox'
import DateInfo from './DateInfo'

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
    const {
        bookmark,
        sentLikes,
        handleLikes,
        deleteBookmark,
        handleJumpLink,
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
    const handleCopyUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
        copyToClipBoard(bookmark.url, () => {
            toast.success('クリップボードにURLをコピーしました',)
        })
        e.stopPropagation()
        e.preventDefault()
    }
    const handleOpenUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        e.preventDefault()
        handleJumpLink()
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
            <Duplicate className='w-6 md:w-5' strokeWidth={1.5} />
        </SvgIconButton>)
    const openButton = (
        <SvgIconButton aria-label='Open URL in New Tab' onClick={handleOpenUrl}>
            <ExternalLink className='w-6 md:w-5' strokeWidth={1.5} />
        </SvgIconButton>
    )
    const deleteButton = (
        <SvgIconButton aria-label='Delete Bookmark' onClick={handleDelete}>
            <Trash className='w-5' strokeWidth={1.5} />
        </SvgIconButton>
    )
    const heartButton = (
        <HeartButton
            aria-label='Likes'
            size='w-5'
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
    const dateInfo = (
        <DateInfo created={bookmark.created} lastUpdate={bookmark.lastUpdate}/>
    )
    const origin = new URL(bookmark.url)
    return (
        <Presenter
            {...{
                attachDnDRef,
                dragging,
                image,
                opacity,
                detailLink: `/bookmarks/${bookmark.groupId}/${bookmark.id}`,
                title: bookmark.title,
                description: !listViewMask.includes('description') && bookmark.description,
                url: !listViewMask.includes('url') && origin.host,
                comment: !listViewMask.includes('comment') && bookmark.comment,
                dateInfo,
                copyIcon: copyButton,
                openIcon: openButton,
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