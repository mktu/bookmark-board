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
                <div className="hidden relative flex-wrap items-stretch w-full md:flex">
                    <span className="absolute z-10 justify-center items-center py-3 pl-3 w-8 h-full text-base font-normal leading-snug text-center text-primary-700 bg-transparent rounded">
                        {icon}
                    </span>
                    <input {...props} type="text" className="relative py-3 px-3 pl-10 w-full text-primary-700 placeholder:text-primary-200 bg-white rounded outline-none focus:outline-none focus:ring shadow md:text-sm" />
                </div>
                <div className='flex overflow-hidden flex-row items-center max-w-full md:hidden'>
                    <span className="justify-center items-center w-8 h-full text-base font-normal leading-snug text-center text-primary-700 bg-transparent rounded">
                        {icon}
                    </span>
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