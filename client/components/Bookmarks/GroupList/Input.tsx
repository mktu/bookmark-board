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
                <div className="hidden md:flex relative flex-wrap items-stretch w-full">
                    <span className="absolute z-10 justify-center items-center py-3 pl-3 w-8 h-full text-base font-normal leading-snug text-center text-primary-700 bg-transparent rounded">
                        {icon}
                    </span>
                    <input {...props} type="text" className="relative py-3 px-3 pl-10 w-full md:text-sm placeholder-primary-200 text-primary-700 bg-white rounded focus:ring shadow outline-none focus:outline-none" />
                </div>
                <div className='flex md:hidden overflow-hidden flex-row items-center max-w-full'>
                    <div className='overflow-hidden flex-1 w-full'>
                        <div className='bg-white rounded focus:ring shadow'>
                            <BookmarkInputBase aria-label='Input Bookmark URL' padding='px-3' {...props} />
                        </div>
                    </div>
                </div>
            </div>
        )

    }
export default Input