import React from 'react'
import { FolderOpen } from '@components/Common/Icon'
import { useRouter } from 'next/router'
import { useHoverable } from '@hooks/useBookmarkGroupDnd'
import classNames from 'classnames'
import { checkIsTouch } from '@utils/dnd'

type Props = {
    bookmarkGroup: BookmarkGroup & { bookmarkCount : number },
    onHover: Parameters<typeof useHoverable>[1],
    listIndex: Parameters<typeof useHoverable>[2],
    bookmarkLoaded : boolean
}

const ListItem: React.FC<Props> = ({
    bookmarkGroup,
    onHover,
    listIndex,
    bookmarkLoaded
}) => {
    const isTouch = checkIsTouch()
    const { attachDnDRef, isBookmarkOver, dragging } = useHoverable(bookmarkGroup, onHover, listIndex)
    const router = useRouter()
    if (!bookmarkGroup || !bookmarkGroup.id) {
        return <div />
    }
    const { ids } = router.query
    const selected = Boolean(ids) && ids[0] === bookmarkGroup.id
    return (
        <button ref={!isTouch ? attachDnDRef : undefined} onClick={() => {
            router.push(`/bookmarks/[[...ids]]`, `/bookmarks/${bookmarkGroup.id}`, { shallow: true })
        }} className={classNames(`w-full bg-white md:bg-transparent overflow-hidden flex text-primary-main items-center p-2 cursor-pointer md:hover:text-primary-dark md:hover:bg-primary-hover focus:outline-none ${selected && 'md:bg-primary-hover'}`,
            isBookmarkOver && 'border-dotted border-primary-main border-2',
            dragging && 'hidden'
        )}>
            <div ref={isTouch ? attachDnDRef : undefined}>
                <FolderOpen className='w-8 stroke-primary-main' strokeWidth={1} />
            </div>
            <div className='mr-1 ml-2 truncate'>{bookmarkGroup.name}</div>
            <div className={`text-sm ${bookmarkLoaded ? 'opacity-100' : 'opacity-0'}`}>({bookmarkGroup.bookmarkCount})</div>
        </button>
    )
}

export default ListItem