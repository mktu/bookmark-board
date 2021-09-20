import React from 'react'
import { ButtonBase } from '../Button'
import { PopoverDivContainer } from '../Popover'
import classNames from 'classnames'
import { hex2rgb } from '../../../utils'

type Props = {
    className?: string,
    colors?: BookmarkColors,
    boxSize: 5 | 6,
    handleSelectColor: (color: string) => void,
    value?: string
}

export const ColorPallet: React.FC<Props> = ({
    colors = {},
    className,
    boxSize,
    handleSelectColor,
    value
}) => {
    const [r, g, b] = hex2rgb(colors[value]?.color)
    return (
        <div className={classNames(className, 'p-2 m-1 rounded')}>
            <div className='flex items-center whitespace-pre-wrap'>
                {Object.keys(colors).map(c => (
                    <ButtonBase aria-label={c} key={c}
                        style={c === value ? { border: `1px solid rgba(${r},${g},${b},0.5)`, padding: '3px' } : {}}
                        className='flex justify-center items-center mx-1 bg-white rounded' onClick={() => {
                            handleSelectColor(c)
                        }}>
                        <div className={classNames(`w-${boxSize} h-${boxSize} rounded`)} style={{ backgroundColor: colors[c].color }} />
                    </ButtonBase>
                ))}
                <ButtonBase aria-label='None' style={!value ? { border: `1px solid rgba(0,0,0,0.5)`, padding: '3px' } : {}} className='flex justify-center items-center mx-1 bg-white rounded' onClick={() => {
                    handleSelectColor('')
                }}>
                    <div className={classNames(`w-${boxSize} h-${boxSize} rounded bg-white border-secondary-500 border`)} >
                        <svg className='w-full h-full stroke-secondary-500'>
                            <line stroke="5, 5" x1="0" y1="100%" x2="100%" y2="0" strokeWidth={1} />
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
            <ButtonBase aria-label='Current Color' style={{ border: `1px solid rgba(${r},${g},${b},0.25)` }} className='flex justify-center items-center p-1 bg-clip-padding bg-white rounded border'>
                <div className={classNames(`w-${boxSize} h-${boxSize} rounded`)} style={{ backgroundColor: value }} />
            </ButtonBase>
        </PopoverDivContainer>
    )
}

export default ColorPicker
