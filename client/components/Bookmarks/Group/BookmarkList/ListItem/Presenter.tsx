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
        <div ref={!isTouch ? attachDnDRef : undefined} className={`w-full ${dragging && 'hidden'} relative flex flex-col justify-center`}
            style={color ? { borderLeft: `${borderWidth}px solid ${color}`, opacity } : { opacity }} >

            <div className='flex w-full bg-white p-2 shadow hover:bg-gray-50' >
                <div className='absolute top-0 z-10 flex items-start' style={color ? { left: -borderWidth } : { left: 0 }}>{checkButton}</div>
                <div ref={isTouch ? attachDnDRef : undefined} style={{ minWidth: BookmarkListImageSize, minHeight: BookmarkListImageSize }} className='flex items-center overflow-hidden'>
                    {image}
                </div>
                <div style={{ minHeight: BookmarkListImageSize }} className='mx-2' />
                <Link href={detailLink}>
                    <a href={detailLink} className='flex max-w-full flex-1 flex-col items-start justify-center overflow-hidden' tabIndex={0}>
                        <div className='max-w-full overflow-hidden truncate'>{title || url}</div>
                        {description && (<div className='max-w-full overflow-hidden truncate text-xs text-primary-main' key={description} > {description}</div>)}
                        {url && (
                            <div className='mt-auto max-w-full items-center overflow-hidden truncate pt-1 text-xs text-primary-main md:flex' >
                                {url && (
                                    <div className='flex items-center'>
                                        <span>
                                            <LinkIcon className='mr-1 w-4 stroke-primary-main' />
                                        </span>
                                        <span className='max-w-full overflow-hidden truncate text-primary-main' > {url}</span>
                                    </div>
                                )}
                            </div>)}
                        {comment && (
                            <div className='mt-1 flex max-w-full items-center rounded border border-primary-border p-1 text-xs text-primary-main' >
                                <Chat className='mr-1 w-6 stroke-primary-300' strokeWidth={1} />
                                <div className='flex-1 overflow-hidden truncate'>
                                    {comment}
                                </div>
                            </div>)}

                    </a>
                </Link>
                <div className='ml-auto hidden flex-col justify-start md:flex'>
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
                    <div className='mt-auto hidden items-center justify-end md:flex'>
                        <div className='mr-2'>{colorButton}</div>
                        <div>{heartButton}</div>
                    </div>
                </div>
            </div>
            <div className='flex w-full items-center rounded-tr bg-white py-1 px-2 shadow md:hidden' >
                {dateInfo}
                <div className='ml-auto flex items-center border-x border-primary-border px-2'>
                    <div className='mx-2'>{colorButton}</div>
                </div>
                <div className='flex items-center pl-2'>
                    <div className='mx-2 pb-1'>
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