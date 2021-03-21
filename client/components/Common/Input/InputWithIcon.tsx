import React from 'react'
import {InputProps} from './TextInputBase'

const InputWithIcon: React.FC<InputProps & {
    icon?: React.ReactNode,
}> = ({
    icon,
    ...props
}) => {
        return (
            <div className="relative flex w-full flex-wrap items-stretch">
                <span className="z-10 h-full leading-snug font-normal text-center text-primary-700 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    {icon}
                </span>
                <input {...props} type="text" className="px-3 py-3 placeholder-primary-200 text-primary-700 relative bg-white rounded md:text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10" />
            </div>
        )
    }
export default InputWithIcon