import React from 'react'
import classNames from 'classnames'
import { useInView } from 'react-intersection-observer'

type Topic = {
    icon: React.ReactNode,
    content: React.ReactNode,
    name: React.ReactNode | string
}

type Props = {
    title: React.ReactNode | string,
    description?: React.ReactNode | string,
    topics: Topic[],
    className?: string,
    style?: React.CSSProperties
}

const Topic: React.FC<Props> = ({
    title,
    topics,
    description,
    className,
    style }) => {
    const { ref, inView } = useInView({ triggerOnce: true })
    return (
        <section ref={ref} style={style} className={classNames(
            'w-full md:p-8 break-words flex flex-col justify-center items-center transition-all duration-1000',
            inView ? 'opacity-100' : 'opacity-0',
            className)}>
            <h1 className='my-4 text-2xl font-bold text-primary-700'>{title}</h1>
            <div className='mb-4'>{description}</div>
            <div className='justify-between md:flex'>
                {topics.map((v, i) => (
                    <div key={i} className='flex w-full max-w-screen-md flex-col bg-primary-light p-4 shadow-lg md:mx-4 md:rounded-lg'>
                        <div className='flex items-center bg-white p-2 text-primary-dark md:rounded-lg md:text-primary-700'>
                            <div className='mx-2'>{v.icon}</div>
                            <div>{v.name}</div>
                        </div>
                        <div className='my-2 h-full flex-1 bg-white p-4 text-primary-dark md:rounded-lg md:text-primary-main'>
                            {v.content}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Topic;