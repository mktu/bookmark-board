import React from 'react'
import { Chat, Refresh } from '../../../../../Common/Icon'
import { BookmarkListImageSize } from '../../../../../../utils/constants'

type Props = {
    color?: string,
    image: React.ReactNode,
    title?: string,
    url?: string,
    maskUrl?: boolean,
    description?: string,
    comment?: string,
    lastUpdate?: string,
    copyIcon: React.ReactNode,
    openIcon: React.ReactNode,
    deleteIcon: React.ReactNode,
    heartButton: React.ReactNode,
    colorButton: React.ReactNode,
    style: React.CSSProperties
}

const ListItem: React.FC<Props> = ({
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
    heartButton,
    colorButton,
    style
}) => {
    return (
        <div className={`w-full flex items-center cursor-pointer opacity-50`} style={color ? { borderLeft: `5px solid ${color}`, ...style } : { ...style }} >
            <div className='flex p-2 w-full bg-white hover:bg-gray-50 shadow'>
            <div className='flex p-2 w-full bg-white hover:bg-gray-50 shadow'>
            <div style={{ minWidth: BookmarkListImageSize, minHeight: BookmarkListImageSize }} className='flex overflow-hidden items-center'>
                {image}
            </div>
            <div style={{ minHeight: BookmarkListImageSize }} className='mx-2 border-r border-primary-border' />
            <div className='flex overflow-hidden flex-col flex-1 justify-center items-start max-w-full'>
                <div className='overflow-hidden max-w-full truncate'>{title || url}</div>
                {description && (<div className='overflow-hidden max-w-full text-xs text-primary-main truncate' key={description} > {description}</div>)}
                {url && (<div className='overflow-hidden max-w-full text-xs font-thin text-primary-main truncate' > {url}</div>)}
                {comment && (
                    <div className='flex items-center py-1 max-w-full text-xs font-thin text-primary-main' >
                        <Chat className='mr-1 w-6 stroke-primary-300' strokeWidth={2} />
                        <div className='overflow-hidden flex-1 truncate'>
                            {comment}
                        </div>
                    </div>)}
                {lastUpdate && (
                    <div className='flex overflow-hidden items-center pt-1 mt-auto max-w-full text-xs font-thin text-primary-main truncate' >
                        <span className='mr-1'>
                            <Refresh className='w-4 stroke-primary-main' />
                        </span>
                        <span>{lastUpdate}</span>
                    </div>)}
            </div>
            <div className='flex flex-col justify-start ml-auto'>
                <div className='flex items-start'>
                    <div className='hidden md:block mx-1'>
                        {copyIcon}
                    </div>
                    <div className='md:mx-1'>
                        {openIcon}
                    </div>
                    <div className='hidden md:block mx-1'>
                        {deleteIcon}
                    </div>
                </div>
                <div className='flex justify-end items-center mt-auto'>
                    <div className='hidden md:block mr-2'>{colorButton}</div>
                    <div>{heartButton}</div>
                </div>
            </div>
        </div>
            </div>
        </div>
    )
}

export default ListItem