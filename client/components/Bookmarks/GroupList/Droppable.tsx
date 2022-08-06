import React from 'react'
import { useDrop } from 'react-dnd'

type Props = {
    onChangeOrder: (target: string) => void,
    open: boolean,
    droppable: boolean
}

const Droppable: React.FC<Props> = ({
    onChangeOrder,
    open,
    droppable
}) => {
    const [, drop] = useDrop({
        accept: 'GROUP',
        drop: (_, monitor) => {
            const i = monitor.getItem<BookmarkGroup>()
            onChangeOrder(i.id)
        }
    })
    return (
        <div ref={drop} className={`w-full`}>
            <div className={`${open ? 'h-16 w-full' : 'h-0'} ${droppable && 'transition-all duration-200 ease-in-out'}`} />
        </div>
    )
}

export default Droppable