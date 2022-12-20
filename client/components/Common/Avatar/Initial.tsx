import React from 'react'
import initials from 'initials'
import classNames from 'classnames'

function ja2Bit(str: string) {
    return (str.match(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/)) ? true : false;
}

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
    const ini = ja2Bit(name) ? name[0] : initials(name)
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