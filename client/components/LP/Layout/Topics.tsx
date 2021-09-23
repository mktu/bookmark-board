import React  from 'react'
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
    className?: string,
    style?: React.CSSProperties
}

const Topic = React.forwardRef<HTMLElement, Props>(function topic({
    title,
    topics,
    description,
    className,
    style
}, ref) {
    return (
        <section ref={ref} style={style} className={classNames('w-full md:p-8 break-words flex flex-col justify-center items-center', className)}>
            <h1 className='my-4 text-2xl font-bold text-primary-700'>{title}</h1>
            <div className='mb-4'>{description}</div>
            <div className='md:flex justify-between'>
                {topics.map((v, i) => (
                    <div key={i} className='flex flex-col p-4 md:mx-4 w-full max-w-screen-md bg-primary-light md:rounded-lg shadow-lg'>
                        <div className='flex items-center p-2 text-primary-dark md:text-primary-700 bg-white md:rounded-lg'>
                            <div className='mx-2'>{v.icon}</div>
                            <div>{v.name}</div>
                        </div>
                        <div className='flex-1 p-4 my-2 h-full text-primary-dark md:text-primary-main bg-white md:rounded-lg'>
                            {v.content}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
})

export default Topic;