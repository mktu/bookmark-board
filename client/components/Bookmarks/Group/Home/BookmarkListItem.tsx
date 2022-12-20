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
        <div className='flex w-full items-end overflow-hidden'>
            <Link
                href={path}
                className='max-w-full flex-1 overflow-hidden truncate text-sm'>

                <span className='mr-2 underline'>{bookmark.title}</span>
                <span className='mr-2'>[{group.name}]</span>

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
    );
}

export default BookmarkListItem