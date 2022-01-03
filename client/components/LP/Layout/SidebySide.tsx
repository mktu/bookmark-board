import React, { CSSProperties } from 'react'
import classNames from 'classnames'

type ContentProps = {
    title: React.ReactNode | string,
    content: React.ReactNode,
    image: React.ReactNode,
}

type Props = {
    className?: string,
    style?: CSSProperties,
    imageLeft?: boolean
} & ContentProps



const RightImageLayout: React.FC<ContentProps> = ({
    title,
    content,
    image,
}) => (
    <>
        <div className='flex flex-col justify-center break-words md:mx-12 md:w-1/3'>
            <h1 className='my-4 text-xl font-bold text-primary-700 md:text-2xl'>{title}</h1>
            {content}
        </div>
        <div className='overflow-hidden my-8 shadow-lg md:my-0'>
            {image}
        </div>
    </>
)

const LeftImageLayout: React.FC<ContentProps> = ({
    title,
    content,
    image,
}) => (
    <>
        <div className='flex flex-col justify-center break-words md:hidden'>
            <h1 className='my-4 text-xl font-bold text-primary-700 md:text-2xl'>{title}</h1>
            {content}
        </div>
        <div className='my-8 md:my-0'>
            {image}
        </div>
        <div className='hidden flex-col justify-center mx-12 w-1/3 break-words md:flex'>
            <h1 className='my-4 text-xl font-bold text-primary-700 md:text-2xl'>{title}</h1>
            {content}
        </div>
    </>
)

const SideBySide = React.forwardRef<HTMLElement, Props>(function sideBySide({
    className,
    imageLeft = false,
    style,
    ...props
}, ref) {
    return (
        <section style={style} ref={ref} className={classNames('w-full md:flex flex-row p-4 md:p-8 justify-center', className)} >
            {imageLeft ? (
                <LeftImageLayout {...props} />
            ) : (
                <RightImageLayout {...props} />
            )}
        </section>
    )
})

export default SideBySide;