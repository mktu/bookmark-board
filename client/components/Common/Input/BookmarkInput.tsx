import React from 'react'
import classNames from 'classnames'
import { InputProps } from './TextInputBase'

export const BookmarkInputBase: React.FC<InputProps & { padding?: string }> = ({
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
        <div className="relative mb-3 flex w-full flex-wrap items-stretch">
            <input {...props} type="text" className="relative w-full rounded bg-white p-3 text-primary-700 shadow outline-none placeholder:text-primary-200 focus:outline-none focus:ring md:text-sm" />
        </div>
    )
}

export default BookmarkInput