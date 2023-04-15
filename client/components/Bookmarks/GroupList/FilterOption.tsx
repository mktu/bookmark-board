import { TextButton } from '@components/Common/Button'
import Clear from '@components/Common/Input/Clear'
import TextInput from '@components/Common/Input/TextInput'
import React from 'react'

type Props = {
    onChangeSearchWord: (text: string) => void,
    searchWord?: string,
    onClose: () => void
}

const FilterOption: React.FC<Props> = ({
    onChangeSearchWord,
    searchWord,
    onClose
}) => {
    return (
        <div className='flex w-[280px] flex-col gap-2 rounded border border-primary-border bg-white p-4 shadow'>
            <TextInput label='グループを検索' value={searchWord} onChange={(e) => {
                onChangeSearchWord(e.target.value)
            }} clear={
                <Clear handleClear={() => { onChangeSearchWord('') }} />
            } />
            <div className='flex items-end justify-end'>
                <TextButton onClick={onClose}>閉じる</TextButton>
            </div>
        </div>
    )
}

export default FilterOption