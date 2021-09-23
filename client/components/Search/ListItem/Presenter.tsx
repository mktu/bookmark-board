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
            <a href={bookmarkDetailUrl} className='flex p-2 w-full bg-white hover:bg-gray-50 shadow cursor-pointer'>
                <div style={{ minWidth: BookmarkListImageSize, minHeight: BookmarkListImageSize }} className='flex overflow-hidden items-center'>
                    {image}
                </div>
                <div style={{ minHeight: BookmarkListImageSize }} className='mx-2' />
                <div className='flex overflow-hidden flex-col flex-1 justify-center items-start max-w-full'>
                    <div className='overflow-hidden max-w-full truncate'>{title}</div>
                    {description && (<div className='overflow-hidden max-w-full text-xs text-primary-main truncate' key={description} > {description}</div>)}
                    {comment && (
                        <div className='flex items-center py-1 max-w-full text-xs font-thin text-primary-main' >
                            <Chat className='mr-1 w-6 stroke-primary-300' strokeWidth={2} />
                            <div className='overflow-hidden flex-1 truncate'>
                                {comment}
                            </div>
                        </div>)}
                </div>
                <div className='flex flex-col justify-start ml-auto'>
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