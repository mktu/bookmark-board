import React from 'react'
import initials from 'initials'
import classNames from 'classnames'

const bgValues = [
    '#607d8b',
    '#e91e63',
    '#829075',
    '#6f8e9f',
    '#8e7ec3',
    '#c96fb6',
    '#d17293',
    '#d7708f',
    '#e76e5f',
    '#ea7046',
    '#e87245',
    '#da7855',
]

type Props = {
    width?: number,
    height?: number,
    className?: string,
    name?: string,
}
const Initial: React.FC<Props> = ({
    width,
    height,
    name = 'Unknown',
    className
}) => {
    const ini = initials(name)
    const colodIdx = (name.length * ini.length) % bgValues.length
    return (
        <div className={classNames(className, `flex items-center justify-center rounded-full text-white p-2 overflow-hidden`)}
            style={{
                width,
                height,
                backgroundColor: bgValues[colodIdx],
            }}>
            {ini}
        </div>
    )
}



export default Initial