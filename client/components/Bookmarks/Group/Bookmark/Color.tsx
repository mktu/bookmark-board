import React from 'react'
import { Dropdowns } from '../../../Common/Input'
import { ColorPallet } from '../../../Common/Input/ColorPicker'
import { Label } from '../../../Common/Label'

type Props = {
    handleUpdate : (value:string)=>void,
    color ?: string,
    colors : BookmarkColors
}

const Color: React.FC<Props> = ({
    handleUpdate,
    color,
    colors
}) => (
        <div className='flex'>
            <Label className='block'>色を設定</Label>
            <div className='flex flex-col items-end ml-auto'>
                <ColorPallet colors={colors} boxSize={5} value={color} handleSelectColor={handleUpdate} />
                <Dropdowns
                    allowEmpty
                    placement='auto-end'
                    comboStyles={{
                        width : 160
                    }}
                    poperStyles={{
                        maxHeight: 200,
                    }}
                    options={Object.keys(colors).map(v=>({ label: colors[v].name, value : v }))}
                    selected={color}
                    onSelect={handleUpdate} />
            </div>
        </div>
    )

export default Color