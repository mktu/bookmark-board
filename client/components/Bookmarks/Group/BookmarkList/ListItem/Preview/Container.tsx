import React from 'react'
import { UrlImage } from '@components/Common/Avatar'
import { ExternalLink, Duplicate, Trash } from '@components/Common/Icon'
import { HeartButton, ButtonBase } from '@components/Common/Button'
import { useRefinementById } from '@modules/groupRefinementSlice'
import { numberToDateTime } from '@utils/index'
import { BookmarkListImageSize } from '@utils/constants'
import { useBookmark } from '@hooks/useBookmark'
import Presenter from './Presenter'


type Props = {
    bookmarkId: string,
    style: React.CSSProperties
}

const ListItem: React.FC<Props> = ({
    bookmarkId,
    style
}) => {
    const {
        bookmark,
        sentLikes,
    } = useBookmark(bookmarkId)
    const { listViewMask = [] } = useRefinementById(bookmark.groupId)

    const image = (
        <UrlImage
            src={bookmark.image}
            enableEndpoint={!bookmark.disableEndpoint}
            width={BookmarkListImageSize}
            height={BookmarkListImageSize}
            name={bookmark.title} />
    )
    const copyButton = (<Duplicate className='w-5' strokeWidth={1.5} />)
    const openButton = (<ExternalLink className='w-5' strokeWidth={1.5} />)
    const deleteButton = (<Trash className='w-5' strokeWidth={1.5} />)
    const heartButton = (
        <HeartButton
            aria-label='Likes'
            size='w-4'
            active={sentLikes}
            onClick={() => {
                //
            }}
        />)
    const colorButton = <ButtonBase className='text-xs text-primary-main underline' >色設定</ButtonBase>
    return (
        <Presenter
            {...{
                image,
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
                colorButton,
                style
            }}
        />
    )
}

export default ListItem