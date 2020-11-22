import React from 'react'
import classNames from 'classnames'


export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, ...props }) => (
    <label {...props} className={classNames('block text-primary-400 text-sm font-bold', className)} />
)
