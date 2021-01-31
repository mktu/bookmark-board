import React from 'react'
import { UrlImage } from '../../../../../Common/Avatar'
import { ExternalLink, Duplicate, Trash } from '../../../../../Common/Icon'
import { HeartButton } from '../../../../../Common/Button'
import { useRefinementById } from '../../../../../../modules/groupRefinementSlice'
import { numberToDateTime } from '../../../../../../utils'
import { BookmarkListImageSize } from '../../../../../../utils/constants'
import { useBookmark } from '../../../../../../hooks/useBookmark'
import Presenter from './Presenter'


type Props = {
    bookmarkId: string,
    style : React.CSSProperties
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
            onClick={()=>{
                //
            }}
        />)
    return (
        <Presenter
            {...{
                image,
                detailLink : `/bookmarks/${bookmark.groupId}/${bookmark.id}`,
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
                style
            }}
        />
    )
}

export default ListItem