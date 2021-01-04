import React from 'react'
import { ButtonBase } from '../Button'
import { PopoverDivContainer } from '../Popover'
import classNames from 'classnames'

type Props = {
    className?: string,
    colors?: BookmarkColors,
    boxSize: 5 | 6,
    handleSelectColor: (color: string) => void,
    value?: string
}

function hex2rgb(hex?: string) {
    if (!hex) {
        return [0, 0, 0]
    }
    if (hex.slice(0, 1) == "#") hex = hex.slice(1);
    if (hex.length == 3) hex = hex.slice(0, 1) + hex.slice(0, 1) + hex.slice(1, 2) + hex.slice(1, 2) + hex.slice(2, 3) + hex.slice(2, 3);

    return [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map(function (str) {
        return parseInt(str, 16);
    });
}

export const ColorPallet: React.FC<Props> = ({
    colors = {},
    className,
    boxSize,
    handleSelectColor,
    value
}) => {
    const [r, g, b] = hex2rgb(value)
    return (
        <div className={classNames(className, 'p-2 m-1 rounded')}>
            <div className='whitespace-pre-wrap flex items-center'>
                {Object.keys(colors).map(c => (
                    <ButtonBase aria-label={c} key={c} style={c === value ? { border: `1px solid rgba(${r},${g},${b},0.5)`, padding:'3px' } : {}} className='rounded bg-white flex items-center justify-center mx-1' onClick={() => {
                        handleSelectColor(c)
                    }}>
                        <div className={classNames(`w-${boxSize} h-${boxSize} rounded`)} style={{ backgroundColor: c }} />
                    </ButtonBase>
                ))}
                <ButtonBase aria-label='None' style={!value ? { border: `1px solid rgba(0,0,0,0.5)`, padding:'3px' } : {}} className='rounded bg-white flex items-center justify-center mx-1' onClick={() => {
                    handleSelectColor('')
                }}>
                    <div className={classNames(`w-${boxSize} h-${boxSize} rounded bg-white border-secondary-500 border`)} >
                        <svg className='w-full h-full stroke-secondary-500'>
                            <line stroke="5, 5" x1="0" y1="100%" x2="100%" y2="0" strokeWidth={1}/>
                        </svg>
                    </div>
                </ButtonBase>
            </div>
        </div >
    )
}

const ColorPicker: React.FC<Props> = ({
    colors,
    className,
    boxSize,
    handleSelectColor,
    value
}) => {
    const [r, g, b] = hex2rgb(value)
    return (
        <PopoverDivContainer className={classNames(className)} content={
            <ColorPallet {...{ colors, boxSize, handleSelectColor, value }} />}>
            <ButtonBase aria-label='Current Color' style={{ border: `1px solid rgba(${r},${g},${b},0.25)` }} className='rounded bg-white border flex items-center justify-center p-1 bg-clip-padding'>
                <div className={classNames(`w-${boxSize} h-${boxSize} rounded`)} style={{ backgroundColor: value }} />
            </ButtonBase>
        </PopoverDivContainer>
    )
}

export default ColorPicker
