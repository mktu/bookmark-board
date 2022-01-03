import React from 'react'
import classNames from 'classnames'
import {InputProps} from './TextInputBase'

export const BookmarkInputBase: React.FC<InputProps & {padding?:string}> = ({
    className,
    padding = 'px-3 py-3',
    ...props
}) => {
    return (
        <input {...props} type="text" className={classNames("bg-transparent placeholder-primary-200 text-primary-700 relative md:text-sm outline-none focus:outline-none w-full", padding, className)} />
    )
}

const BookmarkInput: React.FC<InputProps> = ({
    ...props
}) => {
    return (
        <div className="flex relative flex-wrap items-stretch mb-3 w-full">
            <input {...props} type="text" className="relative py-3 px-3 w-full placeholder:text-primary-200 text-primary-700 bg-white rounded outline-none focus:outline-none focus:ring shadow md:text-sm" />
        </div>
    )
}

export default BookmarkInput