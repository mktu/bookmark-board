import React, { forwardRef } from 'react'
import classNames from 'classnames'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const TextInputBase = forwardRef<HTMLInputElement, InputProps>(({
    className,
    disabled,
    ...props
}, ref) => {
    return (
        <input ref={ref} disabled={disabled} {...props} type="text" className={classNames(className, 'outline-none focus:outline-none w-full', disabled ? 'cursor-default opacity-25' : '')} />
    )
})

TextInputBase.displayName = 'TextInputBase'

export default TextInputBase