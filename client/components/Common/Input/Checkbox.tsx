import React from 'react'
import { TextInputBase } from '.'
import { Label } from '../Label'
import classNames from 'classnames'

type Props = Parameters<typeof TextInputBase>[0] & {
    label?: string,
    required?: boolean,
    requiredMessage ?: string
}

const Checkbox : React.FC<Props> = ({
    label,
    className,
    id,
    ...props
}) => {
    return (
        <div className={classNames(label && 'flex items-center', className)}>
            <input {...props} type="checkbox" id={id}/>
            {label && (<Label htmlFor={id} className='ml-2 whitespace-pre' textSize='text-xs' weight='font-normal' color='text-primary-dark'>{label}</Label> )}
        </div>
    )
}

export default Checkbox