import React from 'react'
import Presenter from './Presenter'
import { toast } from 'react-toastify';
import { UrlImage } from '@components/Common/Avatar'
import { ExternalLink, Duplicate } from '@components/Common/Icon'
import { SvgIconButton } from '@components/Common/Button'
import { BookmarkListImageSize } from '@utils/constants'
import { copyToClipBoard } from '@utils/index'
import { getRelativeDate } from '@utils/date'

type Props = {
    bookmark: Bookmark,
    grouping : boolean,
    groupName ?: string,
}

const Container: React.FC<Props> = ({
    bookmark,
    grouping,
    groupName
}) => {
    const handleCopyUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
        copyToClipBoard(bookmark.url, () => {
            toast.success('クリップボードにURLをコピーしました',)
        })
        e.stopPropagation()
        e.preventDefault()
    }
    const handleJumpLink = (e:React.MouseEvent<HTMLButtonElement>) => {
        window && window.open(
            bookmark.url,
            '_blank'
        );
        e.preventDefault()
        e.stopPropagation()
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

    const copyIcon = (
        <SvgIconButton aria-label='Copy URL' onClick={handleCopyUrl}>
            <Duplicate className='w-5' strokeWidth={1.5} />
        </SvgIconButton>)
    const openIcon = (
        <SvgIconButton aria-label='Open URL in New Tab' onClick={handleJumpLink}>
            <ExternalLink className='w-5' strokeWidth={1.5} />
        </SvgIconButton>
    )
    const groupLink = `/bookmarks/${bookmark.groupId}`

    return (
        <Presenter
            {...{
                image,
                grouping,
                groupName,
                groupLink,
                copyIcon,
                openIcon,
                title : bookmark.title,
                description : bookmark.description,
                comment : bookmark.comment,
                bookmarkDetailUrl : `/bookmarks/${bookmark.groupId}/${bookmark.id}`,
                created : getRelativeDate(bookmark.created, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",}).msg,
                urlLink : bookmark.url
            }}

        />
    )
}

export default Container