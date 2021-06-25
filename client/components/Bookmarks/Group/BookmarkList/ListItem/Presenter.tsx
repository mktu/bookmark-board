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
    lastUpdate?: string, // not use
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
    checkButton
}) => {
    const isTouch = checkIsTouch()
    return (
        <div ref={!isTouch ? attachDnDRef : undefined} className={`w-full ${dragging && 'hidden'} flex items-center relative`}
            style={color ? { borderLeft: `${borderWidth}px solid ${color}`, opacity } : { opacity }} >
            <div className='p-2 flex bg-white w-full shadow hover:bg-gray-50' >
                <div className='absolute top-0 z-10 flex items-start' style={color ? {left : -borderWidth} : {left : 0}}>{checkButton}</div>
                <div ref={isTouch ? attachDnDRef : undefined} style={{ minWidth: BookmarkListImageSize, minHeight: BookmarkListImageSize }} className='overflow-hidden flex items-center'>
                    {image}
                </div>
                <div style={{ minHeight: BookmarkListImageSize }} className='mx-2' />
                <Link href={detailLink}>
                    <a href={detailLink} className='flex flex-col items-start justify-center max-w-full overflow-hidden flex-1' tabIndex={0}>
                        <div className='overflow-hidden truncate max-w-full'>{title || url}</div>
                        {description && (<div className='overflow-hidden truncate text-xs text-primary-main max-w-full' key={description} > {description}</div>)}
                        {url && (
                            <div className='mt-auto pt-1 overflow-hidden truncate text-xs text-primary-main max-w-full md:flex items-center' >
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
                                            <LinkIcon className='w-4 stroke-primary-main mr-1' />
                                        </span>
                                        <span className='overflow-hidden truncate text-primary-main max-w-full' > {url}</span>
                                    </div>
                                )}
                            </div>)}
                        {comment && (
                            <div className='mt-1 text-xs text-primary-main max-w-full flex items-center p-1 border border-primary-border rounded' >
                                <Chat className='w-6 stroke-primary-300 mr-1' strokeWidth={1} />
                                <div className='overflow-hidden truncate flex-1'>
                                    {comment}
                                </div>
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

export default Presenter