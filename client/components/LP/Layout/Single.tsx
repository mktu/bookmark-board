import React from 'react'
import classNames from 'classnames'
import { useInView } from 'react-intersection-observer'

type Props = {
    title: React.ReactNode | string,
    content: React.ReactNode,
    className?: string,
    style?: React.CSSProperties
}

const Single: React.FC<Props> = ({
    title,
    content,
    className,
    style
}) => {
    const { ref, inView } = useInView({ triggerOnce: true })
    return (
        <section style={style} ref={ref} className={classNames(
            'w-full flex flex-row justify-center transition-all duration-1000',
            inView ? 'opacity-100' : 'opacity-0',
            className)}>
            <div className='flex flex-col items-center justify-center break-words p-4 md:mx-12 md:w-1/3'>
                <h1 className='my-4 text-2xl font-bold text-primary-700'>{title}</h1>
                {content}
            </div>
        </section>
    )
}

export default Single;