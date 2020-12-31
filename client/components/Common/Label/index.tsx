import React from 'react'
import classNames from 'classnames'

type TextSize = 'text-xs' | 'text-sm' | 'text-base'
type FontWeight = 'font-bold' | 'font-normal'
type Color = 'text-primary-400' | 'text-primary-dark'

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement> & {
    textSize?:TextSize,
    weight?:FontWeight,
    color?:Color
}> = ({ className, textSize = 'text-sm', weight = 'font-bold', color = 'text-primary-400', ...props }) => {
    return (
        <label {...props} className={classNames('block', textSize, weight, color, className)} />
    )
}