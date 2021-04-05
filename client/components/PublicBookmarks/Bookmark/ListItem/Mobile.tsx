import React from 'react'
import Chat from '../../../Common/Icon/Chat'
import Link from '../../../Common/Icon/Link'
import { hex2rgb } from '../../../../utils/rgb'

type Props = {
    title: string,
    description: string,
    comment?: string,
    image: React.ReactNode,
    color?: string,
    host?: string,
    url: string
}

const Default: React.FC<Props> = ({
    title,
    description,
    comment,
    image,
    color,
    host,
    url
}) => {
    const [r, g, b] = hex2rgb(color)
    return (
        <div className='py-2 px-2 border rounded border-primary-border'>
            <a target='_blank' rel='noopener noreferrer' href={url} className='block p-1 text-sm overflow-hidden overflow-ellipsis max-w-full text-primary-dark underline'>{title}</a>
            <div className='border-b-2 my-2 border-primary-border' style={{ borderColor: color && `rgba(${r},${g},${b},0.5)` }} />
            <div className='flex py-2'>
                <div className='flex items-center justify-center'>
                    {image}
                </div>
                <div className='ml-2 overflow-hidden w-full flex-1 flex flex-col border-l border-primary-border pl-2' >
                    <div className='text-xs overflow-hidden overflow-ellipsis max-w-full text-primary-main'>
                        {(description && description.length > 100) ? description.substr(0, 100) + '...' : description}
                    </div>
                    <div  className='mt-auto flex justify-end items-center text-xs overflow-hidden overflow-ellipsis max-w-full text-primary-main'>
                        <Link className='w-4 stroke-primary-main mr-1'/>
                        <span>{host}</span>
                    </div>
                </div>
            </div>
            {comment && (
                <div className='text-xs md:overflow-hidden md:truncate max-w-full flex items-center text-primary-main p-1 border rounded'>
                    <div><Chat className='w-6 stroke-primary-300 mr-2' /></div>
                    <div className='md:overflow-hidden md:truncate flex-1 text-xs'>
                        {comment}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Default