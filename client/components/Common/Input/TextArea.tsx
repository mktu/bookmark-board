import React, { useState } from 'react'
import ResizableTextAreaBase from './ResizableTextAreaBase'
import { Label } from '../Label'
import classNames from 'classnames'
import styles from './index.module.scss'

const borderVariants = {
    'underline': 'border-b',
    'outlined': 'rounded border overflow-hidden'
}

type Props = Parameters<typeof ResizableTextAreaBase>[0] & {
    clear?: React.ReactNode,
    border?: keyof typeof borderVariants
    label?: string,
    className?: string
    paddings?: string
}

const TextArea: React.FC<Props> = ({
    id,
    label,
    border = 'underline',
    paddings = 'pl-2 pb-2',
    className,
    clear,
    onFocus,
    onBlur,
    ...props
}) => {

    const [focus, setFocus] = useState(false)

    const borderClasses = borderVariants[border]

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setFocus(false)
        onBlur && onBlur(e)
    }


    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setFocus(true)
        onFocus && onFocus(e)
    }

    return (
        <div className={classNames('w-full', className)}>
            {label &&
                <Label htmlFor={id} className='mb-2'>
                    {label}
                </Label>}
            <div className={classNames('relative flex items-center border-primary-border', paddings, borderClasses)}>
                <ResizableTextAreaBase id={id} {...props} className='resize-none bg-white text-primary-700 placeholder:text-primary-200 md:text-sm'
                    onFocus={handleFocus}
                    onBlur={handleBlur} />
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

export default TextArea