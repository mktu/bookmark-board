import React from 'react'
import Link from 'next/link'
import { Chat, Refresh } from '../../../../Common/Icon'
import { TooltipDivContainer } from '../../../../Common/Tooltip'
import { BookmarkListImageSize } from '../../../../../utils/constants'


type Props = {
    detailLink: string,
    attachDnDRef: (el: HTMLElement) => void,
    dragging: boolean,
    color?: string,
    image: React.ReactNode,
    title?: string,
    url?:string,
    maskUrl?:boolean,
    description?: string,
    comment?: string,
    lastUpdate?: string,
    copyIcon : React.ReactNode,
    openIcon : React.ReactNode,
    deleteIcon : React.ReactNode,
    heartButton : React.ReactNode,
}

const ListItem: React.FC<Props> = ({
    detailLink,
    attachDnDRef,
    dragging,
    color,
    image,
    title,
    url,
    description,
    comment,
    lastUpdate,
    copyIcon,
    openIcon,
    deleteIcon,
    heartButton
}) => {

    return (
        <Link href={detailLink}>
            <a href={detailLink} ref={attachDnDRef} className={`w-full ${dragging && 'hidden'} flex items-center cursor-pointer`}
                style={color ? { borderLeft: `5px solid ${color}` } : {}} tabIndex={0}>
                <div className='p-2 flex bg-white w-full shadow hover:bg-gray-50'>
                    <div style={{ minWidth: BookmarkListImageSize, minHeight: BookmarkListImageSize }} className='overflow-hidden flex items-center'>
                        {image}
                    </div>
                    <div style={{ minHeight: BookmarkListImageSize }} className='mx-2 border-primary-border border-r' />
                    <div className='flex flex-col items-start justify-center max-w-full overflow-hidden flex-1'>
                        <div className='overflow-hidden truncate max-w-full'>{title || url}</div>
                        {description && (<div className='overflow-hidden truncate text-xs text-primary-main max-w-full' key={description} > {description}</div>)}
                        {url && (<div className='overflow-hidden truncate text-xs text-primary-main font-thin max-w-full' > {url}</div>)}
                        {comment && (
                            <div className='text-xs text-primary-main font-thin max-w-full flex items-center py-1' >
                                <Chat className='w-6 stroke-primary-300 mr-1' strokeWidth={2} />
                                <div className='overflow-hidden truncate flex-1'>
                                    {comment}
                                </div>
                            </div>)}
                        {lastUpdate && (
                            <div className='mt-auto pt-1 overflow-hidden truncate text-xs text-primary-main font-thin max-w-full flex items-center' >
                                <span className='mr-1'>
                                    <Refresh className='w-4 stroke-primary-main' />
                                </span>
                                <span>{lastUpdate}</span>
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
                            <TooltipDivContainer content='削除' placement='bottom' className='hidden md:block mx-1'>
                                {deleteIcon}
                            </TooltipDivContainer>
                        </div>
                        <div className='mt-auto flex items-center justify-end'>
                            {heartButton}
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default ListItem