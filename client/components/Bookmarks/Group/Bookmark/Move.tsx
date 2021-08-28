import React from 'react'
import { Label } from '@components/Common/Label'
import Dropdowns from '@components/Common/Input/Dropdowns'
import Checkbox from '@components/Common/Input/Checkbox'
import { OutlinedButton } from '@components/Common/Button'

type Props = {
    moveDest?: BookmarkGroup,
    copy: boolean,
    groups: BookmarkGroup[]
    disabled: boolean,
    handleSelectMoveDest: (id: string) => void,
    handleCheckCopy: (checked: boolean) => void,
    handleMove: () => void
}

const Move: React.FC<Props> = ({
    moveDest,
    copy,
    disabled,
    groups,
    handleCheckCopy,
    handleSelectMoveDest,
    handleMove
}) => (
    <div>
        <Label className='mb-4'>グループを移動</Label>
        <div className='md:flex items-center'>
            <Dropdowns
                className='w-40'
                poperStyles={{
                    maxHeight: 200,
                }}
                placement='auto-start'
                options={groups.map(g => ({ label: g.name, value: g.id }))}
                selected={moveDest?.id}
                onSelect={handleSelectMoveDest} />
            <Checkbox label='コピーを作成' className='ml-2 mt-2' id='copy' onChange={(e) => { handleCheckCopy(e.target.checked) }} />
            <OutlinedButton
                disabled={disabled}
                className='block ml-auto'
                colorType='secondary'
                onClick={handleMove}>
                {copy ? 'コピーする' : '移動する'}
            </OutlinedButton>
        </div>
    </div>
)

export default Move