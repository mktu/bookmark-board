import React from 'react'
import {SvgFillIconButton} from '.'
import HeartFill from '../Icon/HeartFill'
import ClassNames from 'classnames'

type Props = Parameters<typeof SvgFillIconButton>[0] & {
    active ?: boolean,
    counter ?: number,
    size ?: 'w-6' | 'w-5' | 'w-4'
}

const HeartButton : React.FC<Props>= ({
    active,
    className,
    counter,
    size = 'w-6',
    ...props
}) => (
    <SvgFillIconButton
        {...props}
        colorType={active?'secondary-active' : 'dark'}
        className={ClassNames(className,`flex items-end`)}>
        <div className={`rounded-full p-1 ${active ? 'bg-secondary-light' : 'bg-primary-light'}`}>
            <HeartFill className={size} strokeWidth={0} />
        </div>
        {counter && (
            <div className={`text-xs ${active ? 'text-secondary-main' : 'text-primary-main'}`}>{counter}</div>
        )}
    </SvgFillIconButton>
)

export default HeartButton