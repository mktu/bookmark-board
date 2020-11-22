import React, { useState, useEffect } from 'react'
import { TextInputBase } from '.'
import { SvgIconButton } from '../Button'
import { XFill } from '../Icon'
import styles from './index.module.scss'

type Props = Parameters<typeof TextInputBase>[0] & {
    handleSubmit: (value: string) => void,
    clearButton?: boolean
}


const TextInput: React.FC<Props> = ({
    value,
    handleSubmit,
    clearButton,
    ...props
}) => {
    const [text, setText] = useState(value)
    const [focus, setFocus] = useState(false)
    useEffect(() => {
        setText(value)
    }, [value])
    return (
        <div className='w-full'>
            <div className='flex items-center border-b border-primary-border relative'>
                <TextInputBase {...props} className='block px-3 py-3 placeholder-primary-200 text-primary-700 relative bg-white text-sm'
                    value={text}
                    onFocus={() => {
                        setFocus(true)
                    }}
                    onChange={(e) => {
                        setText(e.target.value)
                    }} 
                    onBlur={() => {
                        setFocus(false)
                        if (text !== value) {
                            handleSubmit('' + text)
                        }
                    }} />
                {clearButton && (
                    <div className='ml-auto px-2'>
                        <SvgIconButton onClick={() => {
                            setText('')
                            handleSubmit('')
                        }}>
                            <XFill className='w-6 fill-primary-100  hover:fill-primary-300' strokeWidth={0} />
                        </SvgIconButton>
                    </div>
                )}

            </div>
            <div className={`${focus ? styles['input-border-focus'] : styles['input-border']}`}></div>
        </div>

    )
}

export default TextInput