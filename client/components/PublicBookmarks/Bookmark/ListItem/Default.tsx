import React from 'react'
import Chat from '../../../Common/Icon/Chat'
import Link from '../../../Common/Icon/Link'
import { TooltipDivContainer } from '../../../Common/Tooltip'
import { hex2rgb } from '../../../../utils/rgb'

type Props = {
    title: string,
    description: string,
    comment?: string,
    image: React.ReactNode,
    copyButton: React.ReactNode,
    detailButton: React.ReactNode,
    color?: string,
    url: string,
    host?: string
}

const Default: React.FC<Props> = ({
    title,
    description,
    comment,
    image,
    copyButton,
    detailButton,
    color,
    host,
    url
}) => {
    const [r, g, b] = hex2rgb(color)
    return (
        <div className='flex rounded border border-primary-border py-1 px-2'>
            <div className='flex items-center justify-center' style={{ minWidth: '64px' }}>
                {image}
            </div>
            <div className='ml-2 flex w-full flex-1 flex-col overflow-hidden border-l-2 pl-2' style={{ borderColor: color && `rgba(${r},${g},${b},0.5)` }}>
                <a target='_blank' rel='noopener noreferrer' href={url} className='mb-1 block max-w-full overflow-hidden truncate text-sm text-primary-dark underline'>{title}</a>
                <div className='max-w-full overflow-hidden truncate text-xs text-primary-main'>{description}</div>
                <div className='mt-auto flex max-w-full items-center overflow-hidden truncate text-xs text-primary-main'>
                    <Link className='mr-1 w-3 stroke-primary-main' />
                    <span>{host}</span>
                </div>
                {comment && (
                    <div className='flex max-w-full items-center overflow-hidden truncate py-1 text-xs text-primary-main'>
                        <div className='mr-2 flex max-w-full items-center rounded border border-primary-200 p-1'>
                            <Chat className='w-6 stroke-primary-300' />
                            <div className=' mx-2 flex-1 overflow-hidden truncate'>
                                {comment}
                            </div>
                        </div>

                    </div>
                )}
            </div>
            <div className='ml-2 flex flex-col items-center' style={{ minHeight: '64px' }}>
                <TooltipDivContainer content='URLをコピー' placement='bottom' className='flex items-start'>
                    {copyButton}
                </TooltipDivContainer>
                <div className='mt-auto'>
                    <TooltipDivContainer content='詳細を表示' placement='bottom' className='flex items-start'>
                        {detailButton}
                    </TooltipDivContainer>
                </div>
            </div>
        </div>
    )
}

export default Default