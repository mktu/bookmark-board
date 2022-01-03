import React from 'react'
import classNames from 'classnames'

type Props = {
    title : React.ReactNode | string,
    content : React.ReactNode,
    className ?: string,
    style?: React.CSSProperties
}

const Single: React.FC<Props> = React.forwardRef<HTMLElement, Props>(function single({
    title,
    content,
    className,
    style
}, ref) {
    return (
        <section style={style} ref={ref} className={classNames('w-full flex flex-row justify-center', className)}>
            <div className='flex flex-col justify-center items-center p-4 break-words md:mx-12 md:w-1/3'>
                <h1 className='my-4 text-2xl font-bold text-primary-700'>{title}</h1>
                {content}
            </div>
        </section>
    )
})

export default Single;