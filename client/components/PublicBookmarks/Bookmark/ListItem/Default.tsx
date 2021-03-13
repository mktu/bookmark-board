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
        <div className='flex py-1 px-2 border rounded border-primary-border'>
            <div className='flex justify-center items-center' style={{minWidth:'64px'}}>
                {image}
            </div>
            <div className='overflow-hidden w-full flex-1 flex flex-col border-l-2 pl-2 ml-2' style={{ borderColor: color && `rgba(${r},${g},${b},0.5)` }}>
                <a target='_blank' rel='noopener noreferrer' href={url} className='block text-sm overflow-hidden truncate max-w-full text-primary-dark underline mb-1'>{title}</a>
                <div className='text-xs overflow-hidden truncate max-w-full text-primary-main'>{description}</div>
                <div className='mt-auto text-xs overflow-hidden truncate max-w-full text-primary-main flex items-center'>
                    <Link className='w-3 stroke-primary-main mr-1' />
                    <span>{host}</span>
                </div>
                {comment && (
                    <div className='text-xs overflow-hidden truncate max-w-full flex items-center text-primary-main py-1'>
                        <div className='border-primary-200 border rounded p-1 mr-2 flex items-center max-w-full'>
                            <Chat className='w-6 stroke-primary-300' />
                            <div className='overflow-hidden truncate mx-2 flex-1 '>
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