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
                <div className='mt-2 flex w-full items-center overflow-hidden text-primary-main'>
                    <FolderOpen className='mr-1 h-5 w-5' />
                    <Link href={groupLink}>
                        <a href={groupLink} className='truncate underline'>
                            {groupName}
                        </a>
                    </Link>
                </div>
            )}
            <Link href={bookmarkDetailUrl}>
                <a href={bookmarkDetailUrl} className='block w-full cursor-pointer border-b border-primary-border bg-white p-2 hover:bg-gray-50'>
                    <div className='flex'>
                        <div style={{ minWidth: BookmarkListImageSize, minHeight: BookmarkListImageSize }} className='flex items-center overflow-hidden'>
                            {image}
                        </div>
                        <div style={{ minHeight: BookmarkListImageSize }} className='mx-2' />
                        <div className='flex max-w-full flex-1 flex-col items-start justify-center overflow-hidden'>
                            <div className='max-w-full overflow-hidden truncate'>
                                <span>
                                    {title}
                                </span>
                            </div>
                            {description && (<div className='max-w-full overflow-hidden truncate text-xs text-primary-main' key={description} > {description}</div>)}
                            {comment && (
                                <div className='flex max-w-full items-center py-1 text-xs text-primary-main' >
                                    <Chat className='mr-1 w-6 stroke-primary-300' strokeWidth={2} />
                                    <div className='flex-1 overflow-hidden truncate'>
                                        {comment}
                                    </div>
                                </div>)}
                        </div>
                        <div className='ml-auto hidden flex-col justify-start md:flex'>
                            <div className='flex items-start justify-end'>
                                <TooltipDivContainer content='コピー' placement='bottom' className='mx-1'>
                                    {copyIcon}
                                </TooltipDivContainer>
                                <TooltipDivContainer content='URLを開く' placement='bottom' className='md:mx-1'>
                                    {openIcon}
                                </TooltipDivContainer>
                            </div>
                            <div className='mt-auto hidden text-sm text-primary-main md:block'>
                                {created}
                            </div>
                        </div>
                    </div>

                </a>
            </Link>
            <div className='mt-2 pb-1 md:hidden'>
                <div className='flex items-center justify-end'>
                    <div className='mr-2 whitespace-nowrap text-sm text-primary-main'>
                        {created} |
                    </div>
                    <div className='flex items-center whitespace-nowrap text-sm text-primary-main'>
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