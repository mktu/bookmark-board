import React, { CSSProperties } from 'react'
import classNames from 'classnames'

type Props = {
    title : React.ReactNode | string,
    content : React.ReactNode,
    image : React.ReactNode,
    className ?: string,
    style?: CSSProperties
}

const SideBySide = React.forwardRef<HTMLElement, Props>(function sideBySide({
    title,
    content,
    image,
    className,
    style
}, ref) {
    return (
        <section style={style} ref={ref} className={classNames('w-full md:flex flex-row p-4 md:p-8 justify-center', className)} >
            <div className='md:mx-12 md:w-1/3 break-words flex flex-col justify-center'>
                <h1 className='text-primary-700 text-xl md:text-2xl font-bold my-4'>{title}</h1>
                {content}
            </div>
            <div className='my-8 md:my-0 overflow-hidden shadow-lg'>
                {image}
            </div>
        </section>
    )
})

export default SideBySide;