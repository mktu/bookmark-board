import { useDrag, useDrop } from 'react-dnd'

export const useHoverable = (id:string, color: BookmarkColorDescription, listIndex: number, onHover: (index: number) => void) => {
    const [{ dragging, opacity }, drag, preview] = useDrag({
        item: {
            ...color,
            id,
            type: 'COLOR'
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
    const [, drop] = useDrop({
        accept: 'COLOR',
        hover: (_, monitor) => {
            if (monitor.getDifferenceFromInitialOffset().y < 0) {
                onHover(listIndex)
            }
            else {
                onHover(listIndex + 1)
            }
        }
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
    }
}
