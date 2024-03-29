import React, { useEffect, useRef, useState } from 'react'
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
    border?: keyof typeof borderVariants,
    focusOnMount?: boolean
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
    focusOnMount,
    ...props
}) => {
    const [focus, setFocus] = useState(false)
    const ref = useRef<HTMLInputElement>()
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocus(false)
        onBlur && onBlur(e)
    }
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocus(true)
        onFocus && onFocus(e)
    }
    const borderClass = borderVariants[border]
    useEffect(() => {
        focusOnMount && ref.current && ref.current.focus()
    }, [focusOnMount])
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
                    ref={ref}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    id={id}
                    className='relative block bg-white p-3 text-primary-700 placeholder:text-primary-200 md:text-sm'
                />
                {clear && (
                    <div className='ml-auto px-2'>
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