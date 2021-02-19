import React from 'react'
import { useBookmarkGroup, useRefinements } from '../../../../../hooks/useBookmarkGroup'
import Link from 'next/link'
import { hex2rgb } from '../../../../../utils'
type Props = {
    groupId: string
}

const VisibilityOption: React.FC<Props> = ({
    groupId
}) => {
    const { colors } = useBookmarkGroup(groupId)
    const { colorMasks, updateColorFilters } = useRefinements(groupId)
    const colorSettingPath = `/bookmarks/${groupId}/colors`
    return (
        <div className='bg-white p-4 rounded shadow-lg border border-primary-border flex flex-col justify-start align-middle'>
            <p className='text-sm text-primary-main font-semibold'>表示する項目を選択</p>
            
            {colors.map(c => {
                const [r, g, b] = hex2rgb(c.color)
                const show = !colorMasks.includes(c.color)
                return (
                    <div key={c.color}>
                        <label className='flex cursor-pointer items-center mt-2 text-sm font-semibold' htmlFor={c.color}>
                            <input id={c.color} type='checkbox' className='block mr-2 hover:bg-primary-50'
                                checked={show}
                                onChange={(e) => {
                                    updateColorFilters([{ color: c.color, show: e.target.checked }])
                                }} />
                            <span className='mr-2'>{c.name}</span>
                            <div className='ml-auto'>
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
                        </label>
                    </div>
                )
            })}
            <div className='flex justify-end mt-2'>
                <Link href={colorSettingPath} shallow>
                    {// eslint-disable-next-line jsx-a11y/anchor-is-valid
                        (<a className='text-sm inline-block underline text-link-main hover:text-link-hover'>色設定へ</a>)
                    }
                </Link>
            </div>
        </div>
    )
}

export default VisibilityOption