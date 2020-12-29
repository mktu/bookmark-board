import React from 'react'
import { TextInputBase } from '.'
import { Label } from '../Label'
import classNames from 'classnames'

type LabelProps = Parameters<typeof Label>[0]

type Props = Parameters<typeof TextInputBase>[0] & {
    label?: string,
    required?: boolean,
    requiredMessage ?: string,
    labelProps ?: LabelProps
}

const Checkbox : React.FC<Props> = ({
    label,
    className,
    id,
    labelProps = {},
    ...props
}) => {
    const {
        className:labelClass, 
        textSize='text-xs', 
        weight='font-normal', 
        color='text-primary-dark', 
        ...otherLabelClass} = labelProps
    return (
        <div className={classNames(label && 'flex items-center', className)}>
            <input {...props} type="checkbox" id={id}/>
            {label && (<Label className={classNames('ml-2 whitespace-pre', labelClass)} {...{textSize,weight,color}} {...otherLabelClass} htmlFor={id}>{label}</Label> )}
        </div>
    )
}

export default Checkbox