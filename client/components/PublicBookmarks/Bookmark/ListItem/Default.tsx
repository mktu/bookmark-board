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
        <div className='flex py-1 px-2 rounded border border-primary-border'>
            <div className='flex justify-center items-center' style={{minWidth:'64px'}}>
                {image}
            </div>
            <div className='flex overflow-hidden flex-col flex-1 pl-2 ml-2 w-full border-l-2' style={{ borderColor: color && `rgba(${r},${g},${b},0.5)` }}>
                <a target='_blank' rel='noopener noreferrer' href={url} className='block overflow-hidden mb-1 max-w-full text-sm text-primary-dark underline truncate'>{title}</a>
                <div className='overflow-hidden max-w-full text-xs text-primary-main truncate'>{description}</div>
                <div className='flex overflow-hidden items-center mt-auto max-w-full text-xs text-primary-main truncate'>
                    <Link className='mr-1 w-3 stroke-primary-main' />
                    <span>{host}</span>
                </div>
                {comment && (
                    <div className='flex overflow-hidden items-center py-1 max-w-full text-xs text-primary-main truncate'>
                        <div className='flex items-center p-1 mr-2 max-w-full rounded border border-primary-200'>
                            <Chat className='w-6 stroke-primary-300' />
                            <div className=' overflow-hidden flex-1 mx-2 truncate'>
                                {comment}
                            </div>
                        </div>

                    </div>
                )}
            </div>
            <div className='flex flex-col items-center ml-2' style={{ minHeight: '64px' }}>
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