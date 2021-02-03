import React from 'react'
import ListItem from './ListItem'
import Droppable from './Droppable'

type Props = {
    listIndex: number,
    description: BookmarkColorDescription,
    renameColor: (color: string, name: string) => void,
    changeOrder: (color: string, idxTo: number) => void,
    handleDelete: (color: string) => void,
    onHover: (idx: number) => void,
    hover: number
}

const ColorItem: React.FC<Props> = ({
    description,
    listIndex,
    renameColor,
    changeOrder,
    handleDelete,
    onHover,
    hover
}) => {

    return (
        <>
            { listIndex === 0 && (<Droppable droppable={hover != -1} onChangeOrder={(target) => {
                changeOrder(target,0)
            }} open={hover === 0} />)}
            <ListItem {...{
                listIndex,
                description,
                renameColor,
                handleDelete,
                onHover
            }} />
            <Droppable droppable={hover != -1} onChangeOrder={(target) => {
                changeOrder(target, listIndex + 1)
            }} open={hover === listIndex + 1} />
        </>

    )
}

export default ColorItem