import React from 'react'
import Chat from '../../../Common/Icon/Chat'
import { TooltipDivContainer } from '../../../Common/Tooltip'
import { hex2rgb } from '../../../../utils/rgb'

type Props = {
    title: string,
    description: string,
    comment?: string,
    image: React.ReactNode,
    copyButton: React.ReactNode,
    detailButton: React.ReactNode,
    color ?: string
}

const Default: React.FC<Props> = ({
    title,
    description,
    comment,
    image,
    copyButton,
    detailButton,
    color
}) => {
    const [r,g,b] = hex2rgb(color)
    return (
        <div className='py-2 px-2 border rounded border-primary-border'>
            <div className='p-1 text-sm overflow-hidden overflow-ellipsis max-w-full text-primary-dark'>{title}</div>
            <div className='border-b-2  my-2 border-primary-border' style={{borderColor:`rgba(${r},${g},${b},0.5)`}}/>
            <div className='flex items-center'>
                {image}
                <div className='border-l  h-16 mx-2 border-primary-border overflow-hidden'/>
                <div className='ml-2 overflow-hidden w-full  h-full flex-1' >
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