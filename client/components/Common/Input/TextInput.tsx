import React, { useState, useEffect } from 'react'
import { TextInputBase } from '.'
import { SvgIconButton } from '../Button'
import { Label } from '../Label'
import { XFill } from '../Icon'
import styles from './index.module.scss'

type Props = Parameters<typeof TextInputBase>[0] & {
    handleSubmit: (value: string) => void,
    clearButton?: boolean,
    label?: string,
    required?: boolean,
    requiredMessage ?: string
}


const TextInput: React.FC<Props> = ({
    id,
    value,
    handleSubmit,
    clearButton,
    required,
    requiredMessage,
    label,
    ...props
}) => {
    const [text, setText] = useState(value)
    const [focus, setFocus] = useState(false)
    const [showWran, setShowWarn] = useState('')
    useEffect(() => {
        setText(value)
    }, [value])
    return (
        <div className='w-full'>
            {label &&
                <Label htmlFor={id}>
                    {label}
                    {required && (
                        <span className='ml-1'>*</span>
                    )}
                    {showWran && (
                        <span className='text-secondary-main font-normal text-sm ml-1'>{showWran}</span>
                    )}
                </Label>}
            <div className='flex items-center border-b border-primary-border relative'>
                <TextInputBase {...props} id={id} className='block px-3 py-3 placeholder-primary-200 text-primary-700 relative bg-white text-sm'
                    value={text}
                    onFocus={() => {
                        setFocus(true)
                    }}
                    onChange={(e) => {
                        setText(e.target.value)
                    }}
                    onBlur={(e) => {
                        setFocus(false)
                        if (text !== value) {
                            handleSubmit('' + text)
                        }
                        if(required){
                            if(!text){
                                setShowWarn(requiredMessage || '必須フィールドです')
                                e.target.focus()
                            }else{
                                setShowWarn('')
                            }
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