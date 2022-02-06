import React from 'react'
import { InputProps, } from '@components/Common/Input/TextInputBase'
import TextInput from '@components/Common/Input/TextInput'
import { Folder } from '@components/Common/Icon'

const Input: React.FC<InputProps > = ({
    ...props
}) => {
        return (
            <div>
                <div className='flex overflow-hidden flex-row items-center max-w-full'>
                    <span className="justify-center items-center bg-transparent">
                        <Folder className='w-8 h-8 stroke-primary-300'/>
                    </span>
                    <div className='overflow-hidden flex-1 w-full'>
                        <div className='bg-white rounded focus:ring shadow'>
                            <TextInput placeholder='グループ名を入力' aria-label='Input Bookmark URL' {...props} />
                        </div>
                    </div>
                </div>
            </div>
        )

    }

export default Input