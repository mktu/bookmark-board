import React from 'react'
import Chat from '../../../Common/Icon/Chat'
import { TooltipDivContainer } from '../../../Common/Tooltip'

type Props = {
    title: string,
    description:string,
    comment?:string,
    image : React.ReactNode,
    copyButton : React.ReactNode,
    detailButton : React.ReactNode,
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
        <div className='flex py-1 px-2 border rounded border-primary-border items-center'>
            {image}
            <div className='ml-2 overflow-hidden w-full  h-full flex-1'>
                <div className='text-sm overflow-hidden truncate max-w-full text-primary-dark'>{title}</div>
                <div className='text-xs overflow-hidden truncate max-w-full text-primary-main'>{description}</div>
                {comment && (
                    <div className='text-xs overflow-hidden truncate max-w-full flex items-center text-primary-main py-1'>
                        <div className='border-primary-200 border rounded p-1 mr-2 flex items-center'>
                            <Chat className='w-6 stroke-primary-300' /> ひとこと</div>
                        <div className='overflow-hidden truncate flex-1 text-sm'>
                            {comment}
                        </div>
                    </div>
                )}
            </div>
            <div className='ml-2 flex flex-col justify-center items-center' style={{ minHeight: '64px' }}>
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