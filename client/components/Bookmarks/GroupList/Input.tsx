import React from 'react'
import { InputProps, } from '@components/Common/Input/TextInputBase'
import { BookmarkInputBase } from '@components/Common/Input/BookmarkInput'

const Input: React.FC<InputProps & {
    icon?: React.ReactNode,
}> = ({
    icon,
    ...props
}) => {
        return (
            <div>
                <div className="relative hidden w-full flex-wrap items-stretch md:flex">
                    <span className="absolute z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pl-3 text-center text-base font-normal leading-snug text-primary-700">
                        {icon}
                    </span>
                    <input {...props} type="text" className="relative w-full rounded bg-white p-3 pl-10 text-primary-700 shadow outline-none placeholder:text-primary-200 focus:outline-none focus:ring md:text-sm" />
                </div>
                <div className='flex max-w-full flex-row items-center overflow-hidden md:hidden'>
                    <span className="h-full w-8 items-center justify-center rounded bg-transparent text-center text-base font-normal leading-snug text-primary-700">
                        {icon}
                    </span>
                    <div className='w-full flex-1 overflow-hidden'>
                        <div className='rounded bg-white shadow focus:ring'>
                            <BookmarkInputBase aria-label='Input Bookmark URL' padding='px-3' {...props} />
                        </div>
                    </div>
                </div>
            </div>
        )

    }
export default Input