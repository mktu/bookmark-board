import React from 'react'
import classNames from 'classnames'
import {InputProps} from './TextInputBase'

export const BookmarkInputBase: React.FC<InputProps> = ({
    className,
    ...props
}) => {
    return (
        <input {...props} type="text" className={classNames("px-3 py-3 bg-transparent placeholder-primary-200 text-primary-700 relative md:text-sm outline-none focus:outline-none w-full",className)} />
    )
}

const BookmarkInput: React.FC<InputProps> = ({
    ...props
}) => {
    return (
        <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <input {...props} type="text" className="px-3 py-3 placeholder-primary-200 text-primary-700 relative bg-white rounded md:text-sm outline-none focus:outline-none shadow focus:shadow-outline w-full" />
        </div>
    )
}

export default BookmarkInput