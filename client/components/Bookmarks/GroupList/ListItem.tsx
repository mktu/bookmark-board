import React from 'react'
import { FolderOpen } from '../../Common/Icon'
import { useRouter } from 'next/router'
import { useHoverable } from '../../../hooks/useBookmarkGroupDnd'
import classNames from 'classnames'

type Props = {
    bookmarkGroup: BookmarkGroup,
    onHover: Parameters<typeof useHoverable>[1],
    listIndex: Parameters<typeof useHoverable>[2],
}

const ListItem: React.FC<Props> = ({
    bookmarkGroup,
    onHover,
    listIndex
}) => {
    const { attachDnDRef, isBookmarkOver, dragging } = useHoverable(bookmarkGroup, onHover, listIndex)
    if (!bookmarkGroup || !bookmarkGroup.id) {
        return <div />
    }
    const router = useRouter()
    const { ids } = router.query
    const selected = Boolean(ids) && ids[0] === bookmarkGroup.id
    return (
        <button ref={attachDnDRef} onClick={() => {
            router.push(`/bookmarks/[[...ids]]`, `/bookmarks/${bookmarkGroup.id}`, { shallow: true })
        }} className={classNames(`w-full flex text-primary-main items-center p-2 cursor-pointer hover:text-primary-dark hover:bg-primary-hover focus:outline-none ${selected && 'bg-primary-hover'}`,
            isBookmarkOver && 'border-dotted border-primary-main border-2',
            dragging && 'hidden'
        )}>
            <div>
                <FolderOpen className='w-8 stroke-primary-main' strokeWidth={1} />
            </div>
            <div className='ml-2'>{bookmarkGroup.name}</div>
        </button>
    )
}

export default ListItem