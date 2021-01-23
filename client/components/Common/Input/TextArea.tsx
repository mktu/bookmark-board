import React, { useState, useEffect } from 'react'
import ResizableTextAreaBase from './ResizableTextAreaBase'
import { Label } from '../Label'
import { SvgIconButton } from '../Button'
import XFill from '../Icon/XFill'
import classNames from 'classnames'
import styles from './index.module.scss'

type BorderType = 'square' | 'underline' | 'none'

type Props = Parameters<typeof ResizableTextAreaBase>[0] & {
    handleSubmit: (value: string) => void,
    clearButton?: boolean,
    borderType?: BorderType
    label?:string,
    className?:string
}

const TextArea: React.FC<Props> = ({
    id,
    value,
    handleSubmit,
    clearButton,
    label,
    borderType = 'underline',
    className,
    ...props
}) => {

    const [text, setText] = useState(value)
    const [focus, setFocus] = useState(false)
    useEffect(() => {
        setText(value)
    }, [value])

    const borderClasses: { [key in BorderType]: string } = {
        square: 'border rounded',
        underline: 'border-b',
        none: ''
    }

    return (
        <div className={classNames('w-full',className)}>
            {label &&
                <Label htmlFor={id} className='mb-2'>
                    {label}
                </Label>}
            <div className={classNames('relative flex items-center border-primary-border pl-2 pb-2', borderClasses[borderType])}>
                <ResizableTextAreaBase id={id} {...props} className='placeholder-primary-200 text-primary-700 bg-white md:text-sm resize-none'
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value)
                    }}
                    onFocus={() => {
                        setFocus(true)
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
            {borderType === 'underline' && (
                <div className={`${focus ? styles['input-border-focus'] : styles['input-border']}`}></div>
            )}
        </div>
    )
}

export default TextArea