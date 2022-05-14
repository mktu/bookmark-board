import React from 'react'
import Link from 'next/link'
import { numberToDateTime } from '@utils/index'
import { useBookmarkGroup } from '@hooks/useBookmarkGroup'

type Props = {
    bookmark: Bookmark
}

const BookmarkListItem: React.FC<Props> = ({
    bookmark
}) => {
    const path = `/bookmarks/${bookmark.groupId}/${bookmark.id}`
    const { group } = useBookmarkGroup(bookmark.groupId)
    return (
        <div className='flex overflow-hidden items-end w-full'>
            <Link href={path}>
                <a href={path} className='overflow-hidden flex-1 max-w-full text-sm truncate'>
                    <span className='mr-2 underline'>{bookmark.title}</span>
                    <span className='mr-2'>[{group.name}]</span>
                </a>
            </Link>
            <div className='ml-3 text-xs'>
                <span>{numberToDateTime(bookmark.created, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: '2-digit',
                    minute: '2-digit',
                    })}</span>
            </div>
        </div>
    )
}

export default BookmarkListItem