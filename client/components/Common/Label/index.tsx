import React from 'react'
import classNames from 'classnames'

type TextSize = 'xs' | 'sm' | 'base'

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement> & {textSize?:string}> = ({ className, textSize = 'sm', ...props }) => {
    const textSizeClasses : {[key in TextSize]:string}= {
        xs : 'text-xs',
        sm : 'text-sm',
        base : ''
    }
    return (
        <label {...props} className={classNames('block text-primary-400 text font-bold', textSizeClasses[textSize], className)} />
    )
}
