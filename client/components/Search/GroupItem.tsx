import React from 'react'
import Link from 'next/link'
import FolderOpen from '@components/Common/Icon/FolderOpen'

type Props = {
    children: React.ReactNode,
    group: BookmarkGroup,
    className?: string
}

const GroupItem: React.VFC<Props> = ({
    group,
    children,
    className
}) => {
    const link = `/bookmarks/${group.id}`
    return (
        <li key={group.id} className={className}>
            <Link href={link} className='flex items-center'>

                <FolderOpen className='mr-1 h-5 w-5 stroke-primary-main' />
                <p className='text-primary-main underline'>{group.name}</p>

            </Link>

            {children}
        </li>
    );
}

export default GroupItem