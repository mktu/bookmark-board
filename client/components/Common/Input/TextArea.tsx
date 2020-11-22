import React, { useState, useEffect } from 'react'
import { ResizableTextAreaBase } from '.'
import { SvgIconButton } from '../Button'
import { XFill } from '../Icon'
import styles from './index.module.scss'

type Props = Parameters<typeof ResizableTextAreaBase>[0] & {
    handleSubmit: (value: string) => void,
    clearButton?: boolean
}

const TextArea: React.FC<Props> = ({
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
            <div className="relative flex border-b items-center border-primary-border pl-2 pb-2">
                <ResizableTextAreaBase {...props} className='placeholder-primary-200 text-primary-700 bg-white text-sm resize-none'
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
            <div className={`${focus ? styles['input-border-focus'] : styles['input-border']}`}></div>
        </div>
    )
}

export default TextArea