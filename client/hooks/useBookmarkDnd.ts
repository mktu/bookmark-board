import { useDrag, useDrop } from 'react-dnd'

export const useHoverable = (bookmark:Bookmark, listIndex:number, onHover:(index:number)=>void)=>{
    const [{ dragging }, drag] = useDrag({
        item: {
            id: bookmark.id,
            name: bookmark.title,
            idx: bookmark.idx,
            groupId: bookmark.groupId,
            type: 'LIST'
        },
        collect: (monitor) => ({
            dragging: monitor.isDragging(),
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

    const attachDnDRef = (v:HTMLElement)=>{
        drag(v)
        drop(v)
    }

    return {
        dragging,
        attachDnDRef
    }
}
