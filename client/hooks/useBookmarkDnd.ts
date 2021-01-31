import { useDrag, useDrop } from 'react-dnd'

export const useHoverable = (bookmark: Bookmark, listIndex: number, onHover: (index: number) => void) => {
    const [{ dragging, opacity }, drag] = useDrag({
        item: {
            ...bookmark,
            type: 'LIST'
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
        accept: 'LIST',
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
    }
    return {
        dragging,
        attachDnDRef,
        opacity,

    }
}
