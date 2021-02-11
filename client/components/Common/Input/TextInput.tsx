import React, { useState, useEffect } from 'react'
import TextInputBase from './TextInputBase'
import { SvgIconButton } from '../Button'
import { Label } from '../Label'
import XFill from '../Icon/XFill'
import styles from './index.module.scss'

type Props = Parameters<typeof TextInputBase>[0] & {
    handleSubmit?: (value: string) => void,
    onClear ?: ()=>void,
    clearButton?: boolean,
    label?: string,
    required?: boolean,
    requiredMessage?: string,
    className?: string,
}


const TextInput: React.FC<Props> = ({
    id,
    value,
    handleSubmit,
    onChange,
    onFocus,
    onBlur,
    onClear,
    clearButton,
    required,
    requiredMessage,
    label,
    className,
    ...props
}) => {
    const controlled = Boolean(onChange)
    const [text, setText] = useState(value)
    const [focus, setFocus] = useState(false)
    const [showWran, setShowWarn] = useState('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    const handleBlur = (e : React.FocusEvent<HTMLInputElement>) => {
        setFocus(false)
        if (text !== value && handleSubmit && !controlled) {
            handleSubmit('' + text)
        }
        if (required) {
            if (!text) {
                setShowWarn(requiredMessage || '必須フィールドです')
                e.target.focus()
            } else {
                setShowWarn('')
            }
        }
        onBlur && onBlur(e)
    }
    const handleFocus = (e : React.FocusEvent<HTMLInputElement>) => {
        setFocus(true)
        onFocus && onFocus(e)
    }
    const handleClear = () => {
        if(controlled && onClear){
            onClear()
        }
        else if(handleSubmit){
            setText('')
            handleSubmit('')
        }
    }
    useEffect(() => {
        !controlled && setText(value)
    }, [value,controlled])

    return (
        <div className={className}>
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
                <TextInputBase {...props} id={id} className='block px-3 py-3 placeholder-primary-200 text-primary-700 relative bg-white md:text-sm'
                    value={controlled ? value || '' : text}
                    onFocus={handleFocus}
                    onChange={controlled ? onChange : handleChange}
                    onBlur={handleBlur} />
                {clearButton && (
                    <div className='ml-auto px-2'>
                        <SvgIconButton onClick={handleClear}>
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