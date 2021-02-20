import React from 'react'
import TextInput from '../../../../../Common/Input/TextInput'
import { OutlinedButton } from '../../../../../Common/Button'
import { useHoverable } from '../../../../../../hooks/useBookmarkColorDnd'
import { useBookmarkGroup } from '../../../../../../hooks/useBookmarkGroup'


type Props = {
    description: BookmarkColorDescription,
    listIndex: number,
    id: string,
    updateColor: ReturnType<typeof useBookmarkGroup>['updateColor']
    handleDelete: (color: string) => void,
    onHover: (idx: number) => void
}

const ListItem: React.FC<Props> = ({
    id,
    description,
    listIndex,
    updateColor,
    handleDelete,
    onHover
}) => {
    const { color, name } = description
    const { dragging, attachDragRef, attachDropRef, attachPreviewRef } = useHoverable(id, description, listIndex, onHover)
    return (
        <div className={`flex items-center ${dragging ? 'hidden' : ''}`} ref={(v) => {
            attachDropRef(v)
            attachPreviewRef(v)
        }}>
            <div className='mx-2 cursor-move' ref={attachDragRef}>
                <div className='w-5 h-5 rounded' style={{ backgroundColor: color }} />

            </div>
            <div className='flex items-center w-full'>
                <TextInput aria-label='Color Name' className={`w-full`} value={name} onChange={(e) => {
                    updateColor(id, { name: e.target.value })
                }} />
            </div>
            <label className='text-xs text-primary-main underline whitespace-no-wrap cursor-pointer' htmlFor={id}>色を変更</label>
            <input id={id} type='color' className='invisible w-0' value={color} onChange={(e) => {
                updateColor(id, { color: e.target.value })
            }} />
            <OutlinedButton onClick={() => {
                handleDelete(id)
            }} className='text-xs ml-2 whitespace-no-wrap' paddings='px-1'>×</OutlinedButton>
        </div>
    )
}

export default ListItem