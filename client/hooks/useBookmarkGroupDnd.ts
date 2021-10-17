import { useContext } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { toast } from 'react-toastify';
import FirebaseContext from '../context/FirebaseContext'

export const useHoverable = (
    bookmarkGroup: BookmarkGroup,
    onHover: (idx: number) => void,
    listIndex: number,
) => {
    const { clientService } = useContext(FirebaseContext)
    const [{ dragging, opacity }, drag, preview] = useDrag({
        item: {
            ...bookmarkGroup,
            type: 'GROUP'
        },
        collect: (monitor) => ({
            dragging: monitor.isDragging(),
            opacity: monitor.isDragging() ? 0.1 : 1,
        }),
        begin: () => {
            onHover(listIndex)
        },
        end: () => {
            onHover(-1)
        }
    })
    const [{ isBookmarkOver }, drop] = useDrop({
        accept: ['LIST', 'GROUP'],
        drop: (_, monitor) => {
            if (monitor.getItemType() === 'LIST') {
                const i = monitor.getItem()
                clientService.moveGroup([i], bookmarkGroup.id, ()=>{
                    toast.success(`ブックマークを${i.hasOwnership ? '移動しました' : 'コピーしました'}`)
                }, !i.hasOwnership)
            }
        },
        hover: (_, monitor) => {
            if (monitor.getItemType() === 'GROUP') {
                if (monitor.getDifferenceFromInitialOffset().y < 0) {
                    onHover(listIndex)
                }
                else {
                    onHover(listIndex + 1)
                }
            }
        },
        collect: (monitor) => ({
            isBookmarkOver: monitor.getItemType() === 'LIST' && Boolean(monitor.isOver())
        })
    })

    const attachDnDRef = (v: HTMLElement) => {
        drag(v)
        drop(v)
        preview(v)
    }
    const attachDragRef = (v: HTMLElement) => {
        drag(v)
    }
    const attachDropRef = (v: HTMLElement) => {
        drop(v)
    }
    const attachPreviewRef = (v: HTMLElement) => {
        preview(v)
    }
    return {
        dragging,
        attachDnDRef,
        attachDragRef,
        attachDropRef,
        attachPreviewRef,
        opacity,
        isBookmarkOver
    }
}
