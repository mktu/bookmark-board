import React from 'react'
import Chat from '../../../Common/Icon/Chat'
import { TooltipDivContainer } from '../../../Common/Tooltip'

type Props = {
    title: string,
    description: string,
    comment?: string,
    image: React.ReactNode,
    copyButton: React.ReactNode,
    detailButton: React.ReactNode,
}

const Default: React.FC<Props> = ({
    title,
    description,
    comment,
    image,
    copyButton,
    detailButton
}) => {
    return (
        <div className='py-2 px-2 border rounded border-primary-border'>
            <div className='p-1 text-sm overflow-hidden overflow-ellipsis max-w-full text-primary-dark'>• {title}</div>
            <div className='border-b my-2 border-primary-border' />
            <div className='flex items-center'>
                {image}
                <div className='ml-2 overflow-hidden w-full  h-full flex-1'>
                    <div className='text-xs overflow-hidden overflow-ellipsis max-w-full text-primary-main'>
                        {(description && description.length > 100) ? description.substr(0, 100) + '...' : description}
                    </div>
                </div>
                <div className='hidden ml-2 flex-col justify-center items-center sm:flex' style={{ minHeight: '64px' }}>
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
            {comment && (
                <div className='text-xs overflow-hidden truncate max-w-full flex items-center text-primary-main py-1'>
                    <div><Chat className='w-6 stroke-primary-300 mr-2' /></div>
                    <div className='overflow-hidden truncate flex-1 text-xs'>
                        {comment}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Default