import React from 'react'
import { Dropdowns } from '../../../Common/Input'
import { ColorPallet } from '../../../Common/Input/ColorPicker'
import { Label } from '../../../Common/Label'

type Props = {
    handleUpdate : (value:string)=>void,
    color ?: string,
    group : BookmarkGroup
}

const Color: React.FC<Props> = ({
    handleUpdate,
    color,
    group
}) => (
        <div className='flex'>
            <Label className='block'>色を設定</Label>
            <div className='ml-auto flex flex-col items-end'>
                <ColorPallet colors={group.colors} boxSize={5} value={color} handleSelectColor={handleUpdate} />
                <Dropdowns
                    allowEmpty
                    placement='bottom'
                    options={Object.values(group.colors).map(g => ({ label: g.name, value: g.color }))}
                    selected={color}
                    onSelect={handleUpdate} />
            </div>
        </div>
    )

export default Color