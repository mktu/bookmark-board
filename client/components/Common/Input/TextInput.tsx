import React, { useState } from 'react'
import TextInputBase from './TextInputBase'
import { Label } from '../Label'
import styles from './index.module.scss'
import classNames from 'classnames'

const borderVariants = {
    'underline': 'border-b',
    'outlined': 'rounded border overflow-hidden mt-1'
}

type Props = Parameters<typeof TextInputBase>[0] & {
    clear?: React.ReactNode,
    warning?: React.ReactNode,
    icon?: React.ReactNode,
    label?: string,
    required?: boolean,
    className?: string,
    border?: keyof typeof borderVariants
}

export const Warning: React.FC<{ text: string }> = ({ text }) => (
    <span className='ml-1 text-sm font-normal text-secondary-main'>{text}</span>
)

const TextInput: React.FC<Props> = ({
    id,
    clear,
    required,
    icon,
    label,
    warning,
    onFocus,
    onBlur,
    border = 'underline',
    className,
    ...props
}) => {
    const [focus, setFocus] = useState(false)
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocus(false)
        onBlur && onBlur(e)
    }
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocus(true)
        onFocus && onFocus(e)
    }
    const borderClass = borderVariants[border]
    return (
        <div className={className}>
            {label &&
                <Label htmlFor={id}>
                    {label}
                    {required && (
                        <span className='ml-1'>*</span>
                    )}
                    {warning}
                </Label>}
            <div className={classNames('flex items-center border-primary-border relative',
                borderClass)}>
                {icon && (
                    <div className='px-2'>
                        {icon}
                    </div>
                )}
                <TextInputBase {...props}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    id={id}
                    className='block relative py-3 px-3 md:text-sm placeholder-primary-200 text-primary-700 bg-white'
                />
                {clear && (
                    <div className='px-2 ml-auto'>
                        {clear}
                    </div>
                )}
            </div>
            {border === 'underline' && (
                <div className={`${focus ? styles['input-border-focus'] : styles['input-border']}`}></div>
            )}
        </div>
    )
}

export default TextInput