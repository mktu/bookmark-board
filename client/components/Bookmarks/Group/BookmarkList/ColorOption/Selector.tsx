import React from 'react'
import Link from 'next/link'
import { TextButton } from '@components/Common/Button/index'
import { useBookmarkColor } from '@hooks/useBookmarkColor'
import { useRefinements } from '@hooks/useBookmarkRefinement'
import { hex2rgb } from '@utils/rgb'

type Props = {
    groupId: string,
    handleSelectColor: (color: string) => void
}

const Selector: React.FC<Props> = ({
    groupId,
    handleSelectColor
}) => {
    const { colors } = useBookmarkColor(groupId)
    const { colorMasks } = useRefinements(groupId)
    const colorSettingPath = `/bookmarks/${groupId}/colors`
    return (
        <div className='flex flex-col justify-start p-4 align-middle bg-white rounded border border-primary-border shadow-lg'>
            {colors.map(c => {
                const [r, g, b] = hex2rgb(c.color)
                const show = !colorMasks.includes(c.color)
                return (
                    <div key={c.color}>
                        <label className='flex items-center mb-2 text-sm underline cursor-pointer' htmlFor={c.color}>
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
            <div>
                <label className='flex items-center mb-2 text-sm underline cursor-pointer' htmlFor='none-color'>
                    <div className='mr-2 w-4 h-4 bg-white rounded border border-secondary-500' >
                        <svg className='w-full h-full stroke-secondary-500'>
                            <line stroke="4, 4" x1="0" y1="100%" x2="100%" y2="0" strokeWidth={1} />
                        </svg>
                    </div>
                    <TextButton className='mr-2' id='none-color'
                        onClick={() => { handleSelectColor('') }}
                    >選択なし</TextButton>
                </label>
            </div>
            <div>
                <Link href={colorSettingPath}>
                    <a href={colorSettingPath} className='text-sm text-link-main hover:text-link-hover underline'>色設定へ</a>
                </Link>

            </div>
        </div>
    )
}

export default Selector