import React from 'react'
import Chat from '@components/Common/Icon/Chat'
import LinkIcon from '@components/Common/Icon/Link'
import { TooltipDivContainer } from '@components/Common/Tooltip'
import { BookmarkListImageSize } from '@utils/constants'
import { checkIsTouch } from '@utils/dnd'

const borderWidth = 5

type Props = {
    attachDnDRef: (el: HTMLElement) => void,
    dragging: boolean,
    linkUrl : string,
    color?: string,
    opacity: number,
    image: React.ReactNode,
    title?: string,
    hostname?: string,
    description?: string,
    comment?: string,
    lastUpdate?: string, // not use
    copyIcon: React.ReactNode,
    editIcon: React.ReactNode,
    deleteIcon: React.ReactNode,
    heartButton: React.ReactNode,
    colorButton: React.ReactNode,
    checkButton: React.ReactNode,
}

const Presenter: React.FC<Props> = ({
    linkUrl,
    attachDnDRef,
    dragging,
    color,
    opacity,
    image,
    title,
    hostname,
    description,
    comment,
    copyIcon,
    editIcon,
    deleteIcon,
    heartButton,
    colorButton,
    checkButton
}) => {
    const isTouch = checkIsTouch()
    return (
        <div ref={!isTouch ? attachDnDRef : undefined} className={`w-full ${dragging && 'hidden'} flex items-center relative`}
            style={color ? { borderLeft: `${borderWidth}px solid ${color}`, opacity } : { opacity }} >
            <div className='flex p-2 w-full bg-white hover:bg-gray-50 shadow' >
                <div className='flex absolute top-0 z-10 items-start' style={color ? { left: -borderWidth } : { left: 0 }}>{checkButton}</div>
                <div ref={isTouch ? attachDnDRef : undefined} style={{ minWidth: BookmarkListImageSize, minHeight: BookmarkListImageSize }} className='flex overflow-hidden items-center'>
                    {image}
                </div>
                <div style={{ minHeight: BookmarkListImageSize }} className='mx-2' />
                <div className='flex overflow-hidden flex-col flex-1 justify-center items-start max-w-full' >
                    <a href={linkUrl} className='overflow-hidden max-w-full underline truncate' target="_blank" rel="noreferrer">{title || hostname}</a>
                    {description && (<div className='overflow-hidden max-w-full text-xs text-primary-main truncate' key={description} > {description}</div>)}
                    {hostname && (
                        <div className='md:flex overflow-hidden items-center pt-1 mt-auto max-w-full text-xs text-primary-main truncate' >
                            <div className='flex items-center'>
                                <span>
                                    <LinkIcon className='mr-1 w-4 stroke-primary-main' />
                                </span>
                                <span className='overflow-hidden max-w-full text-primary-main truncate' > {hostname}</span>
                            </div>
                        </div>)}
                    {comment && (
                        <div className='flex items-center p-1 mt-1 max-w-full text-xs text-primary-main rounded border border-primary-border' >
                            <Chat className='mr-1 w-6 stroke-primary-300' strokeWidth={1} />
                            <div className='overflow-hidden flex-1 truncate'>
                                {comment}
                            </div>
                        </div>)}

                </div>
                <div className='flex flex-col justify-start ml-auto'>
                    <div className='flex items-start'>
                        <TooltipDivContainer content='編集' placement='bottom' className='md:mx-1'>
                            {editIcon}
                        </TooltipDivContainer>
                        <TooltipDivContainer content='コピー' placement='bottom' className='hidden md:block mx-1'>
                            {copyIcon}
                        </TooltipDivContainer>
                        <TooltipDivContainer content='削除' placement='bottom' className='hidden md:block mx-1'>
                            {deleteIcon}
                        </TooltipDivContainer>
                    </div>
                    <div className='flex justify-end items-center mt-auto'>
                        <div className='hidden md:block mr-2'>{colorButton}</div>
                        <div>{heartButton}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Presenter