import React from 'react'
import {SvgIconButton} from '.'
import {HeartFill} from '../Icon'
import ClassNames from 'classnames'

type Props = Parameters<typeof SvgIconButton>[0] & {
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
    <SvgIconButton
        {...props}
        className={ClassNames(className,`flex items-end ${active ? 'fill-secondary-main hover:fill-secondary-300' : 'fill-primary-300 hover:fill-primary-main'}`)}>
        <div className={`rounded-full p-1 ${active ? 'bg-secondary-light' : 'bg-primary-light'}`}>
            <HeartFill className={size} strokeWidth={0} />
        </div>
        {counter && (
            <div className={`text-xs ${active ? 'text-secondary-main' : 'text-primary-main'}`}>{counter}</div>
        )}
    </SvgIconButton>
)

export default HeartButton