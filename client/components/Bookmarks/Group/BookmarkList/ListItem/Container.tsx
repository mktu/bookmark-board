import React, {useContext} from 'react'
import { UrlImage } from '@components/Common/Avatar'
import { ExternalLink, Duplicate, Trash } from '@components/Common/Icon'
import Check from '@components/Common/Icon/Check'
import { SvgIconButton, HeartButton, ButtonBase } from '@components/Common/Button'
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
    const { dragging, attachDnDRef, opacity } = useHoverable(bookmark, idx, setHover, profile?.id===group?.owner)
    const colors = group?.colors || {}
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
        deleteBookmark().then(()=>{
            toast.success('ブックマークを削除しました')
        })
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
    const checkButton = (
        <ButtonBase aria-label='Check Bookmark' 
            onClick={()=>{
                onCheck(bookmarkId,!checked)
            }}
            className={`${checked ? 
                'bg-primary-main stroke-primary-50' :
                'bg-white opacity-100 stroke-primary-200 hover:border-primary-200 hover:stroke-primary-500'} 
                shadow border-r border-b border-primary-border`}>
            <Check className='w-5 h-5 ' strokeWidth={2} fill='none'/>
        </ButtonBase>
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
                lastUpdate: !listViewMask.includes('lastUpdate') && numberToDateTime(bookmark.lastUpdate),
                copyIcon: copyButton,
                openIcon: openButton,
                deleteIcon: deleteButton,
                heartButton: heartButton,
                color: colors[bookmark.color]?.color,
                colorButton,
                checkButton
            }}
        />
    )
}

export default ListItem