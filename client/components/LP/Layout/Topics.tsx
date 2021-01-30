import React from 'react'
import classNames from 'classnames'

type Topic = {
    icon: React.ReactNode,
    content: React.ReactNode,
    name: React.ReactNode | string
}

type Props = {
    title: React.ReactNode | string,
    description?: React.ReactNode | string,
    topics: Topic[],
    className?: string
}

const SideBySide: React.FC<Props> = ({
    title,
    topics,
    description,
    className
}) => {
    return (
        <section className={classNames('w-full md:p-8 break-words flex flex-col justify-center items-center', className)}>
            <h1 className='text-primary-700 text-2xl font-bold my-4'>{title}</h1>
            <div className='mb-4'>{description}</div>
            <div className='md:flex justify-between'>
                {topics.map((v, i) => (
                    <div key={i} className='flex flex-col md:rounded-lg bg-primary-light max-w-screen-md p-4 text-primary-main w-full md:mx-4'>
                        <div className='flex items-center md:rounded-lg bg-white text-primary-700 p-2'>
                            <div className='mx-2'>{v.icon}</div>
                            <div>{v.name}</div>
                        </div>
                        <div className='my-2 p-4 md:rounded-lg bg-white h-full flex-1'>
                            {v.content}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default SideBySide;