import React from 'react'
import { useBookmarkColor } from '@hooks/useBookmarkColor'
import { useRefinements } from '@hooks/useBookmarkRefinement'
import Link from 'next/link'
import { hex2rgb } from '@utils/rgb'
type Props = {
    groupId: string
}

const VisibilityOption: React.FC<Props> = ({
    groupId
}) => {
    const { colors } = useBookmarkColor(groupId)
    const { colorMasks, updateColorFilters } = useRefinements(groupId)
    const colorSettingPath = `/bookmarks/${groupId}/colors`
    return (
        <div className='flex flex-col justify-start p-4 align-middle bg-white rounded border border-primary-border shadow-lg'>
            <p className='text-sm font-semibold text-primary-main'>表示する項目を選択</p>
            
            {colors.map(c => {
                const [r, g, b] = hex2rgb(c.color)
                const show = !colorMasks.includes(c.id)
                return (
                    <div key={c.color}>
                        <label className='flex items-center mt-2 text-sm font-semibold cursor-pointer' htmlFor={c.color}>
                            <input id={c.color} type='checkbox' className='block mr-2 hover:bg-primary-50'
                                checked={show}
                                onChange={(e) => {
                                    updateColorFilters([{ color: c.id, show: e.target.checked }])
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
                        (<a className='inline-block text-sm text-link-main hover:text-link-hover underline'>色設定へ</a>)
                    }
                </Link>
            </div>
        </div>
    )
}

export default VisibilityOption