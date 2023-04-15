import Clear from '@components/Common/Input/Clear'
import React from 'react'

type Props = {
    onClear: () => void,
    searchWord?: string
}

const SearchFilter: React.FC<Props> = ({
    onClear,
    searchWord
}) => {
    if (!searchWord) {
        return null
    }
    return (
        <div className='flex max-w-full items-center overflow-hidden px-2 py-1 text-sm text-primary-main'>
            <div className='flex-auto overflow-hidden'>
                <span className='font-semibold'>&ldquo;{searchWord}&rdquo;</span>
                <span>を含むグループ</span>
            </div>
            <div className='ml-auto'>
                <Clear handleClear={onClear} />
            </div>
        </div>
    )
}

export default SearchFilter