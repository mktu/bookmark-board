import React from 'react'
import { UrlImage } from '../../../../Common/Avatar'
import { ExternalLink, Duplicate, Trash } from '../../../../Common/Icon'
import { SvgIconButton, HeartButton, ButtonBase } from '../../../../Common/Button'
import { PopoverDivContainer } from '../../../../Common/Popover'
import ColorSelector from '../ColorOption/Selector'
import { useRefinementById } from '../../../../../modules/groupRefinementSlice'
import { copyToClipBoard, numberToDateTime } from '../../../../../utils'
import { BookmarkListImageSize } from '../../../../../utils/constants'
import { toast } from 'react-toastify';
import { useBookmark } from '../../../../../hooks/useBookmark'
import { useHoverable } from '../../../../../hooks/useBookmarkDnd'
import Presenter from './Presenter'


type Props = {
    bookmarkId: string,
    setHover: (idx: number) => void,
    idx: number
}

const ListItem: React.FC<Props> = ({
    bookmarkId,
    setHover,
    idx
}) => {
    const {
        bookmark,
        sentLikes,
        handleLikes,
        deleteBookmark,
        handleJumpLink,
        updateBookmarkImmediately
    } = useBookmark(bookmarkId)
    const { listViewMask = [] } = useRefinementById(bookmark.groupId)
    const { dragging, attachDnDRef, opacity } = useHoverable(bookmark, idx, setHover)

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
    const openButton = (
        <SvgIconButton aria-label='Open URL in New Tab' onClick={handleOpenUrl}>
            <ExternalLink className='w-5' strokeWidth={1.5} />
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
                url: !listViewMask.includes('url') && bookmark.url,
                comment: !listViewMask.includes('comment') && bookmark.comment,
                lastUpdate: !listViewMask.includes('lastUpdate') && numberToDateTime(bookmark.lastUpdate),
                copyIcon: copyButton,
                openIcon: openButton,
                deleteIcon: deleteButton,
                heartButton: heartButton,
                color: bookmark.color,
                colorButton
            }}
        />
    )
}

export default ListItem