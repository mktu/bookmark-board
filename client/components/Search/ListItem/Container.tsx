import React from 'react'
import Presenter from './Presenter'
import { toast } from 'react-toastify';
import { UrlImage } from '../../Common/Avatar'
import { ExternalLink, Duplicate } from '../../Common/Icon'
import { SvgIconButton } from '../../Common/Button'
import { BookmarkListImageSize } from '../../../utils/constants'
import { copyToClipBoard } from '../../../utils'

type Props = {
    bookmark: Bookmark
}

const Container: React.FC<Props> = ({
    bookmark
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

    return (
        <Presenter
            {...{
                image,
                copyIcon,
                openIcon,
                title : bookmark.title,
                description : bookmark.description,
                comment : bookmark.comment,
                bookmarkDetailUrl : `/bookmarks/${bookmark.groupId}/${bookmark.id}`
            }}

        />
    )
}

export default Container