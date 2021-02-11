import React from 'react'
import { TextInput } from '../../../../../Common/Input'
import { OutlinedButton } from '../../../../../Common/Button'
import { useHoverable } from '../../../../../../hooks/useBookmarkColorDnd'

type Props = {
    description: BookmarkColorDescription,
    listIndex:number,
    renameColor: (color: string, name: string) => void,
    handleDelete: (color: string) => void,
    onHover : (idx:number)=>void
}

const ListItem: React.FC<Props> = ({
    description,
    listIndex,
    renameColor,
    handleDelete,
    onHover
}) => {
    const { color, name } = description
    const { dragging, attachDragRef, attachDropRef, attachPreviewRef } = useHoverable(description, listIndex, onHover)
    return (
        <div className={`flex items-center ${dragging ? 'hidden' : ''}`} ref={(v)=>{
            attachDropRef(v)
            attachPreviewRef(v)
        }}>
            <div className='mx-2 cursor-move' ref={attachDragRef}>
                <div className='w-5 h-5 rounded' style={{ backgroundColor: color }} />
            </div>
            <div className='flex items-center w-full'>
                <TextInput aria-label='Color Name' className={`w-full`} value={name} onChange={(e)=>{
                    renameColor(color, e.target.value)
                }} />
            </div>
            <OutlinedButton onClick={() => {
                handleDelete(color)
            }} className='text-xs ml-2 whitespace-no-wrap' paddings='px-1'>×</OutlinedButton>
        </div>
    )
}

export default ListItem