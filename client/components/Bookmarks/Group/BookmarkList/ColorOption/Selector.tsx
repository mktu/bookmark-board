import React from 'react'
import { TextButton } from '../../../../Common/Button/index'
import { useBookmarkGroup, useRefinements } from '../../../../../hooks/useBookmarkGroup'
import { hex2rgb } from '../../../../../utils'
type Props = {
    groupId: string,
    handleSelectColor: (color: string) => void
}

const Selector: React.FC<Props> = ({
    groupId,
    handleSelectColor
}) => {
    const { colors } = useBookmarkGroup(groupId)
    const { colorMasks } = useRefinements(groupId)
    return (
        <div className='bg-white p-4 rounded shadow-lg border border-primary-border flex flex-col justify-start align-middle'>
            {colors.map(c => {
                const [r, g, b] = hex2rgb(c.color)
                const show = !colorMasks.includes(c.color)
                return (
                    <div key={c.color}>
                        <label className='flex cursor-pointer items-center mb-2 text-sm underline' htmlFor={c.color}>
                            <div className='mr-2'>
                                {!show ? (
                                    <div className='w-4 h-4 rounded' style={{ backgroundColor: `rgba(${r},${g},${b},0.1)`, border: `1px solid ${c.color}` }}>
                                        <svg className='w-full h-full' style={{ stroke: c.color }}>
                                            <line stroke="4, 4" x1="0" y1="100%" x2="100%" y2="0" strokeWidth={1} />
                                        </svg>
                                    </div>
                                ) : (
                                        <div className='w-4 h-4 rounded' style={{ backgroundColor: `rgba(${r},${g},${b})`, border: `1px solid ${c.color}` }} />
                                    )}
                            </div>
                            <TextButton className='mr-2' id={c.id}
                                onClick={() => { handleSelectColor(c.id) }}
                            >{c.name}</TextButton>
                        </label>
                    </div>
                )
            })}
        </div>
    )
}

export default Selector