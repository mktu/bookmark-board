import React from 'react'
import Link from 'next/link'
import { Chat } from '../../Common/Icon'
import { TooltipDivContainer } from '../../Common/Tooltip'
import { BookmarkListImageSize } from '../../../utils/constants'


type Props = {
    image: React.ReactNode,
    title?: string,
    bookmarkDetailUrl: string,
    description?: string,
    comment?: string,
    copyIcon: React.ReactNode,
    openIcon: React.ReactNode,
}

const Presenter: React.FC<Props> = ({
    image,
    title,
    bookmarkDetailUrl,
    description,
    comment,
    copyIcon,
    openIcon,
}) => {
    return (
        <Link href={bookmarkDetailUrl}>
            <a href={bookmarkDetailUrl} className='p-2 flex bg-white w-full shadow hover:bg-gray-50 cursor-pointer'>
                <div style={{ minWidth: BookmarkListImageSize, minHeight: BookmarkListImageSize }} className='overflow-hidden flex items-center'>
                    {image}
                </div>
                <div style={{ minHeight: BookmarkListImageSize }} className='mx-2 border-primary-border border-r' />
                <div className='flex flex-col items-start justify-center max-w-full overflow-hidden flex-1'>
                    <div className='overflow-hidden truncate max-w-full'>{title}</div>
                    {description && (<div className='overflow-hidden truncate text-xs text-primary-main max-w-full' key={description} > {description}</div>)}
                    {comment && (
                        <div className='text-xs text-primary-main font-thin max-w-full flex items-center py-1' >
                            <Chat className='w-6 stroke-primary-300 mr-1' strokeWidth={2} />
                            <div className='overflow-hidden truncate flex-1'>
                                {comment}
                            </div>
                        </div>)}
                </div>
                <div className='ml-auto flex flex-col justify-start'>
                    <div className='flex items-start'>
                        <TooltipDivContainer content='コピー' placement='bottom' className='hidden md:block mx-1'>
                            {copyIcon}
                        </TooltipDivContainer>
                        <TooltipDivContainer content='URLを開く' placement='bottom' className='md:mx-1'>
                            {openIcon}
                        </TooltipDivContainer>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default Presenter