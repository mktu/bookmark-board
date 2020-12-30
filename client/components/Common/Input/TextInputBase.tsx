import React from 'react'
import classNames from 'classnames'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const TextInputBase: React.FC<InputProps> = ({
    className,
    disabled,
    ...props
}) => {
    return (
        <input disabled={disabled} {...props} type="text" className={classNames(className,'outline-none focus:outline-none w-full',disabled ? 'cursor-default opacity-25':'')} />
    )
}

export default TextInputBase