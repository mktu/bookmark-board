import React from 'react'
import { useDrop } from 'react-dnd'

type Props = {
    onChangeOrder: (target: string) => void,
    open: boolean,
    droppable: boolean,
    height ?: number
}

const Droppable: React.FC<Props> = ({
    onChangeOrder,
    open,
    droppable,
    height
}) => {
    const [, drop] = useDrop({
        accept: 'LIST',
        drop: (_, monitor) => {
            const i = monitor.getItem()
            onChangeOrder(i.id)
        }
    })

    return (
        <div ref={drop} className={`w-full`}>
            <div className={height ? '' : 'py-1'} style={height ? {paddingTop:height, paddingBottom : height} : {}}>
                <div style={ open ? { height : '5rem' } : {}} className={`${open ? 'w-full' : 'h-0'} ${droppable && 'transition-all ease-in-out duration-200 transform'}`} />
            </div>
        </div>
    )
}

export default Droppable