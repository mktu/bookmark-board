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
        <div className='w-full flex items-end overflow-hidden'>
            <Link href={path}>
                <a href={path} className='text-sm overflow-hidden truncate max-w-full flex-1'>
                    <span className='underline mr-2'>{bookmark.title}</span>
                    <span className='mr-2'>[{group.name}]</span>
                </a>
            </Link>
            <div className='text-xs ml-3'>
                <span>{numberToDateTime(bookmark.created)}</span>
            </div>
        </div>
    )
}

export default BookmarkListItem