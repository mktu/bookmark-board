import React from 'react'
import Link from 'next/link'
import Chat from '@components/Common/Icon/Chat'
import FolderOpen from '@components/Common/Icon/FolderOpen'
import { TooltipDivContainer } from '@components/Common/Tooltip'
import { BookmarkListImageSize } from '@utils/constants'


type Props = {
    image: React.ReactNode,
    groupName?: string,
    title?: string,
    groupLink?: string,
    bookmarkDetailUrl: string,
    description?: string,
    comment?: string,
    copyIcon: React.ReactNode,
    openIcon: React.ReactNode,
    created: string,
    urlLink: string,
    grouping: boolean
}

const Presenter: React.FC<Props> = ({
    image,
    groupName,
    groupLink,
    title,
    bookmarkDetailUrl,
    description,
    comment,
    copyIcon,
    openIcon,
    created,
    urlLink,
    grouping
}) => {
    return (
        <>
            {!grouping && (
                <div className='flex overflow-hidden items-center mt-2 w-full text-primary-main'>
                    <FolderOpen className='mr-1 w-5 h-5' />
                    <Link href={groupLink}>
                        <a href={groupLink} className='underline truncate'>
                            {groupName}
                        </a>
                    </Link>
                </div>
            )}
            <Link href={bookmarkDetailUrl}>
                <a href={bookmarkDetailUrl} className='block p-2 w-full bg-white hover:bg-gray-50 border-b border-primary-border cursor-pointer'>
                    <div className='flex'>
                        <div style={{ minWidth: BookmarkListImageSize, minHeight: BookmarkListImageSize }} className='flex overflow-hidden items-center'>
                            {image}
                        </div>
                        <div style={{ minHeight: BookmarkListImageSize }} className='mx-2' />
                        <div className='flex overflow-hidden flex-col flex-1 justify-center items-start max-w-full'>
                            <div className='overflow-hidden max-w-full truncate'>
                                <span>
                                    {title}
                                </span>
                            </div>
                            {description && (<div className='overflow-hidden max-w-full text-xs text-primary-main truncate' key={description} > {description}</div>)}
                            {comment && (
                                <div className='flex items-center py-1 max-w-full text-xs text-primary-main' >
                                    <Chat className='mr-1 w-6 stroke-primary-300' strokeWidth={2} />
                                    <div className='overflow-hidden flex-1 truncate'>
                                        {comment}
                                    </div>
                                </div>)}
                        </div>
                        <div className='hidden flex-col justify-start ml-auto md:flex'>
                            <div className='flex justify-end items-start'>
                                <TooltipDivContainer content='コピー' placement='bottom' className='mx-1'>
                                    {copyIcon}
                                </TooltipDivContainer>
                                <TooltipDivContainer content='URLを開く' placement='bottom' className='md:mx-1'>
                                    {openIcon}
                                </TooltipDivContainer>
                            </div>
                            <div className='hidden mt-auto text-sm text-primary-main md:block'>
                                {created}
                            </div>
                        </div>
                    </div>

                </a>
            </Link>
            <div className='pb-1 mt-2 md:hidden'>
                <div className='flex justify-end items-center'>
                    <div className='mr-2 text-sm text-primary-main whitespace-nowrap'>
                        {created} |
                    </div>
                    <div className='flex items-center text-sm text-primary-main whitespace-nowrap'>
                        <a href={urlLink} target='_blank' rel='noopener noreferrer'>
                            リンクを開く
                        </a>
                        {openIcon}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Presenter