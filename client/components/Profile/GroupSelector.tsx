import React from 'react'
import { Dropdowns } from '@components/Common/Input'

type Props = {
    handleUpdate: (value: string) => void,
    selected?: string,
    groups: BookmarkGroup[]
}

const GroupSelector: React.FC<Props> = ({
    handleUpdate,
    selected,
    groups
}) => (
    <div className='ml-auto flex items-center justify-end'>
        <Dropdowns
            allowEmpty
            placeholder='登録先グループを選択'
            placement='auto-end'
            comboStyles={{
                width: 160
            }}
            poperStyles={{
                maxHeight: 200,
            }}
            options={groups.map(v => ({ label: v.name, value: v.id }))}
            selected={selected}
            onSelect={handleUpdate} />
    </div>
)

export default GroupSelector