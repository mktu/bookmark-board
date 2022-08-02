import React from 'react'
import { InputProps, } from '@components/Common/Input/TextInputBase'
import TextInput from '@components/Common/Input/TextInput'
import { Folder } from '@components/Common/Icon'

const Input: React.FC<InputProps> = ({
    ...props
}) => {
    return (
        <div>
            <div className='flex max-w-full flex-row items-center overflow-hidden'>
                <span className="items-center justify-center bg-transparent">
                    <Folder className='h-8 w-8 stroke-primary-300' />
                </span>
                <div className='w-full flex-1 overflow-hidden'>
                    <div className='rounded bg-white shadow focus:ring'>
                        <TextInput placeholder='グループ名を入力' aria-label='Input Bookmark URL' {...props} />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Input