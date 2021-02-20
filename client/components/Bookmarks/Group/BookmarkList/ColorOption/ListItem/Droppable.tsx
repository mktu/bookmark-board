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
            const i = monitor.getItem()
            onChangeOrder(i.id)
        }
    })

    return (
        <div ref={drop} className={`w-full`}>
            <div className='py-1' >
                <div className={`${open ? 'w-full h-8' : 'h-0'} ${droppable && 'transition-all ease-in-out duration-200 transform'}`} />
            </div>
        </div>
    )
}

export default Droppable