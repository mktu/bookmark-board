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
        <div className={`flex w-full cursor-pointer items-center opacity-50`} style={color ? { borderLeft: `5px solid ${color}`, ...style } : { ...style }} >
            <div className='flex w-full bg-white p-2 shadow hover:bg-gray-50'>
                <div className='flex w-full bg-white p-2 shadow hover:bg-gray-50'>
                    <div style={{ minWidth: BookmarkListImageSize, minHeight: BookmarkListImageSize }} className='flex items-center overflow-hidden'>
                        {image}
                    </div>
                    <div style={{ minHeight: BookmarkListImageSize }} className='mx-2 border-r border-primary-border' />
                    <div className='flex max-w-full flex-1 flex-col items-start justify-center overflow-hidden'>
                        <div className='max-w-full overflow-hidden truncate'>{title || url}</div>
                        {description && (<div className='max-w-full overflow-hidden truncate text-xs text-primary-main' key={description} > {description}</div>)}
                        {url && (<div className='max-w-full overflow-hidden truncate text-xs font-thin text-primary-main' > {url}</div>)}
                        {comment && (
                            <div className='flex max-w-full items-center py-1 text-xs font-thin text-primary-main' >
                                <Chat className='mr-1 w-6 stroke-primary-300' strokeWidth={2} />
                                <div className='flex-1 overflow-hidden truncate'>
                                    {comment}
                                </div>
                            </div>)}
                        {lastUpdate && (
                            <div className='mt-auto flex max-w-full items-center overflow-hidden truncate pt-1 text-xs font-thin text-primary-main' >
                                <span className='mr-1'>
                                    <Refresh className='w-4 stroke-primary-main' />
                                </span>
                                <span>{lastUpdate}</span>
                            </div>)}
                    </div>
                    <div className='ml-auto flex flex-col justify-start'>
                        <div className='flex items-start'>
                            <div className='mx-1 hidden md:block'>
                                {copyIcon}
                            </div>
                            <div className='md:mx-1'>
                                {openIcon}
                            </div>
                            <div className='mx-1 hidden md:block'>
                                {deleteIcon}
                            </div>
                        </div>
                        <div className='mt-auto flex items-center justify-end'>
                            <div className='mr-2 hidden md:block'>{colorButton}</div>
                            <div>{heartButton}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListItem