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
        <div className='flex flex-col justify-center md:mx-12 md:w-1/3 break-words'>
            <h1 className='my-4 text-xl md:text-2xl font-bold text-primary-700'>{title}</h1>
            {content}
        </div>
        <div className='overflow-hidden my-8 md:my-0 shadow-lg'>
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
        <div className='flex md:hidden flex-col justify-center break-words'>
            <h1 className='my-4 text-xl md:text-2xl font-bold text-primary-700'>{title}</h1>
            {content}
        </div>
        <div className='my-8 md:my-0'>
            {image}
        </div>
        <div className='hidden md:flex flex-col justify-center mx-12 w-1/3 break-words'>
            <h1 className='my-4 text-xl md:text-2xl font-bold text-primary-700'>{title}</h1>
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