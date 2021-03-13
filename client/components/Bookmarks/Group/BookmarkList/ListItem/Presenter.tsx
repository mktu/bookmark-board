import React from 'react'
import Link from 'next/link'
import Chat from '@components/Common/Icon/Chat'
import LinkIcon from '@components/Common/Icon/Link'
import { TooltipDivContainer } from '../../../../Common/Tooltip'
import { BookmarkListImageSize } from '../../../../../utils/constants'

type Props = {
    detailLink: string,
    attachDnDRef: (el: HTMLElement) => void,
    dragging: boolean,
    color?: string,
    opacity: number,
    image: React.ReactNode,
    title?: string,
    url?: string,
    maskUrl?: boolean,
    description?: string,
    comment?: string,
    lastUpdate?: string, // not use
    copyIcon: React.ReactNode,
    openIcon: React.ReactNode,
    deleteIcon: React.ReactNode,
    heartButton: React.ReactNode,
    colorButton: React.ReactNode,
}

const ListItem: React.FC<Props> = ({
    detailLink,
    attachDnDRef,
    dragging,
    color,
    opacity,
    image,
    title,
    url,
    description,
    comment,
    copyIcon,
    openIcon,
    deleteIcon,
    heartButton,
    colorButton
}) => {
    const isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0))
    return (
        <div ref={!isTouch ? attachDnDRef : undefined} className={`w-full ${dragging && 'hidden'} flex items-center`}
            style={color ? { borderLeft: `5px solid ${color}`, opacity } : { opacity }} >
            <div className='p-2 flex bg-white w-full shadow hover:bg-gray-50' >
                <div ref={isTouch ? attachDnDRef : undefined} style={{ minWidth: BookmarkListImageSize, minHeight: BookmarkListImageSize }} className='overflow-hidden flex items-center'>
                    {image}
                </div>
                <div style={{ minHeight: BookmarkListImageSize }} className='mx-2 border-primary-border border-r' />
                <Link href={detailLink}>
                    <a href={detailLink} className='flex flex-col items-start justify-center max-w-full overflow-hidden flex-1' tabIndex={0}>
                        <div className='overflow-hidden truncate max-w-full'>{title || url}</div>
                        {description && (<div className='overflow-hidden truncate text-xs text-primary-main max-w-full' key={description} > {description}</div>)}

                        {comment && (
                            <div className='text-xs text-primary-main font-thin max-w-full flex items-center py-1' >
                                <Chat className='w-6 stroke-primary-300 mr-1' strokeWidth={2} />
                                <div className='overflow-hidden truncate flex-1'>
                                    {comment}
                                </div>
                            </div>)}
                        {url && (
                            <div className='mt-auto pt-1 overflow-hidden truncate text-xs text-primary-main font-thin max-w-full md:flex items-center' >
                                {/* {lastUpdate && (
                                    <div className='flex items-center md:mr-1'>
                                        <span className='mr-1'>
                                            <Refresh className='w-4 stroke-primary-main' />
                                        </span>
                                        <span>{lastUpdate}</span>
                                    </div>
                                )} */}
                                {url && (
                                    <div className='flex items-center'>
                                        <span>
                                            <LinkIcon className='w-4 stroke-primary-main' />
                                        </span>
                                        <span className='overflow-hidden truncate text-primary-main font-thin max-w-full' > {url}</span>
                                    </div>
                                )}
                            </div>)}
                    </a>
                </Link>
                <div className='ml-auto flex flex-col justify-start'>
                    <div className='flex items-start'>
                        <TooltipDivContainer content='コピー' placement='bottom' className='hidden md:block mx-1'>
                            {copyIcon}
                        </TooltipDivContainer>
                        <TooltipDivContainer content='URLを開く' placement='bottom' className='md:mx-1'>
                            {openIcon}
                        </TooltipDivContainer>
                        <TooltipDivContainer content='削除' placement='bottom' className='hidden md:block mx-1'>
                            {deleteIcon}
                        </TooltipDivContainer>
                    </div>
                    <div className='mt-auto flex items-center justify-end'>
                        <div className='mr-2 hidden md:block'>{colorButton}</div>
                        <div>{heartButton}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListItem