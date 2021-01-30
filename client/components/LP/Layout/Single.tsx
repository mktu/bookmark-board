import React from 'react'
import classNames from 'classnames'

type Props = {
    title : React.ReactNode | string,
    content : React.ReactNode,
    className ?: string
}

const Single: React.FC<Props> = ({
    title,
    content,
    className
}) => {
    return (
        <section className={classNames('w-full flex flex-row justify-center', className)}>
            <div className='md:mx-12 md:w-1/3 break-words p-4 flex flex-col items-center justify-center'>
                <h1 className='text-primary-700 text-2xl font-bold my-4'>{title}</h1>
                {content}
            </div>
        </section>
    )
}

export default Single;