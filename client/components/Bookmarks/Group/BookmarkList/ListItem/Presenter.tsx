import React from 'react'
import Link from 'next/link'
import Chat from '@components/Common/Icon/Chat'
import LinkIcon from '@components/Common/Icon/Link'
import { TooltipDivContainer } from '@components/Common/Tooltip'
import { BookmarkListImageSize } from '@utils/constants'
import { checkIsTouch } from '@utils/dnd'

const borderWidth = 5

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
    dateInfo: React.ReactNode,
    copyIcon: React.ReactNode,
    openIcon: React.ReactNode,
    deleteIcon: React.ReactNode,
    heartButton: React.ReactNode,
    colorButton: React.ReactNode,
    checkButton: React.ReactNode,
}

const Presenter: React.FC<Props> = ({
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
    colorButton,
    checkButton,
    dateInfo
}) => {
    const isTouch = checkIsTouch()
    return (
        <div ref={!isTouch ? attachDnDRef : undefined} className={`w-full ${dragging && 'hidden'} flex flex-col justify-center relative`}
            style={color ? { borderLeft: `${borderWidth}px solid ${color}`, opacity } : { opacity }} >

            <div className='flex p-2 w-full bg-white hover:bg-gray-50 shadow' >
                <div className='flex absolute top-0 z-10 items-start' style={color ? { left: -borderWidth } : { left: 0 }}>{checkButton}</div>
                <div ref={isTouch ? attachDnDRef : undefined} style={{ minWidth: BookmarkListImageSize, minHeight: BookmarkListImageSize }} className='flex overflow-hidden items-center'>
                    {image}
                </div>
                <div style={{ minHeight: BookmarkListImageSize }} className='mx-2' />
                <Link href={detailLink}>
                    <a href={detailLink} className='flex overflow-hidden flex-col flex-1 justify-center items-start max-w-full' tabIndex={0}>
                        <div className='overflow-hidden max-w-full truncate'>{title || url}</div>
                        {description && (<div className='overflow-hidden max-w-full text-xs text-primary-main truncate' key={description} > {description}</div>)}
                        {url && (
                            <div className='overflow-hidden items-center pt-1 mt-auto max-w-full text-xs text-primary-main truncate md:flex' >
                                {url && (
                                    <div className='flex items-center'>
                                        <span>
                                            <LinkIcon className='mr-1 w-4 stroke-primary-main' />
                                        </span>
                                        <span className='overflow-hidden max-w-full text-primary-main truncate' > {url}</span>
                                    </div>
                                )}
                            </div>)}
                        {comment && (
                            <div className='flex items-center p-1 mt-1 max-w-full text-xs text-primary-main rounded border border-primary-border' >
                                <Chat className='mr-1 w-6 stroke-primary-300' strokeWidth={1} />
                                <div className='overflow-hidden flex-1 truncate'>
                                    {comment}
                                </div>
                            </div>)}

                    </a>
                </Link>
                <div className='hidden flex-col justify-start ml-auto md:flex'>
                    <div className='flex items-start'>
                        <TooltipDivContainer content='コピー' placement='bottom' className='mx-1'>
                            {copyIcon}
                        </TooltipDivContainer>
                        <TooltipDivContainer content='URLを開く' placement='bottom' className='mx-1'>
                            {openIcon}
                        </TooltipDivContainer>
                        <TooltipDivContainer content='削除' placement='bottom' className='mx-1'>
                            {deleteIcon}
                        </TooltipDivContainer>
                    </div>
                    <div className='hidden justify-end items-center mt-auto md:flex'>
                        <div className='mr-2'>{colorButton}</div>
                        <div>{heartButton}</div>
                    </div>
                </div>
            </div>
            <div className='flex items-center py-1 px-2 w-full bg-white rounded-tr shadow md:hidden' >
                {dateInfo}
                <div className='flex items-center px-2 ml-auto border-x border-primary-border'>
                    <div className='mx-2'>{colorButton}</div>
                </div>
                <div className='flex items-center pl-2'>
                    <div className='pb-1 mx-2'>
                        {heartButton}
                    </div>
                    <div className='mx-2'>
                        {copyIcon}
                    </div>
                    <div className='mx-2'>
                        {openIcon}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Presenter