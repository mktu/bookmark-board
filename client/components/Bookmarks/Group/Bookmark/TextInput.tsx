import React, { useState, useEffect } from 'react'
import { TextInputBase } from '../../../Common/Input'
import { SvgIconButton } from '../../../Common/Button'
import { XFill } from '../../../Common/Icon'

type Props = Parameters<typeof TextInputBase>[0] & {
    handleSubmit: (value: string) => void,
}


const BookmarkTextInput: React.FC<Props> = ({
    value,
    handleSubmit,
    ...props
}) => {
    const [text, setText] = useState(value)
    useEffect(() => {
        setText(value)
    }, [value])
    return (
        <div className='relative flex w-full items-center border-b'>
            <TextInputBase {...props} className='block px-3 py-3 placeholder-primary-200 text-primary-700 relative bg-white text-sm' value={text} onChange={(e) => {
                setText(e.target.value)
            }} onBlur={() => {
                if (text !== value) {
                    handleSubmit('' + text)
                }
            }} />
            <div className='ml-auto px-2'>
                <SvgIconButton onClick={()=>{
                    setText('')
                    handleSubmit('')
                }}>
                    <XFill className='w-6 fill-primary-100  hover:fill-primary-300' strokeWidth={0}/> 
                </SvgIconButton>
            </div>
        </div>
    )
}

export default BookmarkTextInput