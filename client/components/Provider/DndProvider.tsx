import React from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd'
import { usePreview } from 'react-dnd-preview'
import BookmarkPreview from '../Bookmarks/Group/BookmarkList/ListItem/Preview'
import BookmarkGroupPreview from '../Bookmarks/GroupList/Preview'
import ColorPreview from '../Bookmarks/Group/BookmarkList/ColorOption/ListItem/Preview'

type Props = {
    children: React.ReactNode
}
const BookmarkDndProvider: React.FC<Props> = ({ children }) => {
    const isTouch = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0))
    const hasNative = document && (document.elementsFromPoint)

    function getDropTargetElementsAtPoint(x, y, dropTargets) {
        return dropTargets.filter(t => {
            const rect = t.getBoundingClientRect()
            return (
                x >= rect.left &&
                x <= rect.right &&
                y <= rect.bottom &&
                y >= rect.top
            )
        })
    }

    // use custom function only if elementsFromPoint is not supported
    const backendOptions = {
        getDropTargetElementsAtPoint: !hasNative && getDropTargetElementsAtPoint,
    }

    const CustomPreview = () => {
        const { display, itemType, item, style } = usePreview()
        if (!display || !isTouch) {
            return null
        }
        if (itemType === 'COLOR') {
            const description = item as BookmarkColorDescription
            return <ColorPreview description={description} style={style} />
        }
        if (itemType === 'GROUP') {
            const bookmarkGroup = item as BookmarkGroup
            return <BookmarkGroupPreview bookmarkGroup={bookmarkGroup} style={style} />
        }
        const bookmark = item as Bookmark
        return itemType === 'LIST' && (
            <BookmarkPreview bookmarkId={bookmark.id} style={style} />
        )
    }
    return (
        <div>
            <DndProvider backend={isTouch ? TouchBackend : HTML5Backend} options={backendOptions}>
                {children}
                <CustomPreview />
            </DndProvider>
        </div>
    )
}

export default BookmarkDndProvider