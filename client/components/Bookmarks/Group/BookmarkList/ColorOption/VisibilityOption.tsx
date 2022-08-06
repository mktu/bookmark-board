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
    const allMasked = colors.filter(v => colorMasks.includes(v.id)).length === 0
    return (
        <div className='flex flex-col justify-start rounded border border-primary-border bg-white p-4 align-middle shadow-lg'>
            <p className='text-sm font-semibold text-primary-main'>表示する項目を選択</p>
            {colors.length > 0 && (
                <div>
                    <label className='mt-2 flex cursor-pointer items-center text-sm font-semibold' htmlFor='allcolor'>
                        <input id='allcolor' type='checkbox' className='mr-2 block hover:bg-primary-50'
                            checked={allMasked}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    updateColorFilters(colors.map(v => ({
                                        color: v.id,
                                        show: true
                                    })))
                                } else {
                                    updateColorFilters(colors.map(v => ({
                                        color: v.id,
                                        show: false
                                    })))
                                }

                            }} />
                        <span className='mr-2'>全て選択</span>
                    </label>
                </div>
            )}
            {colors.map(c => {
                const [r, g, b] = hex2rgb(c.color)
                const show = !colorMasks.includes(c.id)
                return (
                    <div key={c.color}>
                        <label className='mt-2 flex cursor-pointer items-center text-sm font-semibold' htmlFor={c.color}>
                            <input id={c.color} type='checkbox' className='mr-2 block hover:bg-primary-50'
                                checked={show}
                                onChange={(e) => {
                                    updateColorFilters([{ color: c.id, show: e.target.checked }])
                                }} />
                            <span className='mr-2'>{c.name}</span>
                            <div className='ml-auto'>
                                {!show ? (
                                    <div className='h-4 w-4 rounded' style={{ backgroundColor: `rgba(${r},${g},${b},0.1)`, border: `1px solid ${c.color}` }}>
                                        <svg className='h-full w-full' style={{ stroke: c.color }}>
                                            <line stroke="4, 4" x1="0" y1="100%" x2="100%" y2="0" strokeWidth={1} />
                                        </svg>
                                    </div>
                                ) : (
                                    <div className='h-4 w-4 rounded' style={{ backgroundColor: `rgba(${r},${g},${b})`, border: `1px solid ${c.color}` }} />
                                )}
                            </div>
                        </label>
                    </div>
                )
            })}
            <div className='mt-2 flex justify-end'>
                <Link href={colorSettingPath} shallow>
                    {// eslint-disable-next-line jsx-a11y/anchor-is-valid
                        (<a className='inline-block text-sm text-link-main underline hover:text-link-hover'>色設定へ</a>)
                    }
                </Link>
            </div>
        </div>
    )
}

export default VisibilityOption