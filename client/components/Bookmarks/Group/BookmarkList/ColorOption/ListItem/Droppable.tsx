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
        accept: 'COLOR',
        drop: (_, monitor) => {
            const i = monitor.getItem<BookmarkColors & { id: string }>()
            onChangeOrder(i.id)
        }
    })

    return (
        <div ref={drop} className={`w-full`}>
            <div className='py-1' >
                <div className={`${open ? 'h-8 w-full' : 'h-0'} ${droppable && 'transition-all duration-200 ease-in-out'}`} />
            </div>
        </div>
    )
}

export default Droppable