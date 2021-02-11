import React, { useMemo } from 'react'
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
    const listItem = useMemo(() => (
        <ListItem {...{
            listIndex,
            description : {
                name : description.name,
                idx : description.idx,
                color : description.color
            },
            renameColor,
            handleDelete,
            onHover
        }} />
    ), [listIndex, description.name,description.idx,description.color, renameColor, handleDelete, onHover])
    return (
        <>
            { listIndex === 0 && (<Droppable droppable={hover != -1} onChangeOrder={(target) => {
                changeOrder(target, 0)
            }} open={hover === 0} />)}
            {listItem}
            <Droppable droppable={hover != -1} onChangeOrder={(target) => {
                changeOrder(target, listIndex + 1)
            }} open={hover === listIndex + 1} />
        </>

    )
}

export default ColorItem