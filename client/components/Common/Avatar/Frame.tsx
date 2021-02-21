import React from 'react'
import classNames from 'classnames'

type Props = {
    width?: number,
    height?: number,
    className?: string,
    frame?:'square'|'rounded' | 'none',
    children: React.ReactNode
}

const Frame: React.FC<Props> = ({
    className,
    width,
    height,
    frame = 'circle',
    children
}) => {
    const circleClassName = 'flex justify-center rounded-full overflow-hidden'
    const roundedClassName = 'flex justify-center rounded overflow-hidden'
    const frameClassName = frame==='circle' ? circleClassName : frame==='rounded' ? roundedClassName : ''
    return (
        <div className={classNames( 
            frameClassName,
            className)} style={{
            width,
            height
        }}>
            {children}
        </div>
    )
}

export default Frame