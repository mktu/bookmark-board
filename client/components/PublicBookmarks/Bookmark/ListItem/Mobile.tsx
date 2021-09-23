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
        <div className='py-2 px-2 rounded border border-primary-border'>
            <a target='_blank' rel='noopener noreferrer' href={url} className='block overflow-hidden p-1 max-w-full text-sm text-primary-dark underline overflow-ellipsis'>{title}</a>
            <div className='my-2 border-b-2 border-primary-border' style={{ borderColor: color && `rgba(${r},${g},${b},0.5)` }} />
            <div className='flex py-2'>
                <div className='flex justify-center items-center'>
                    {image}
                </div>
                <div className='flex overflow-hidden flex-col flex-1 pl-2 ml-2 w-full border-l border-primary-border' >
                    <div className='overflow-hidden max-w-full text-xs text-primary-main overflow-ellipsis'>
                        {(description && description.length > 100) ? description.substr(0, 100) + '...' : description}
                    </div>
                    <div  className='flex overflow-hidden justify-end items-center mt-auto max-w-full text-xs text-primary-main overflow-ellipsis'>
                        <Link className='mr-1 w-4 stroke-primary-main'/>
                        <span>{host}</span>
                    </div>
                </div>
            </div>
            {comment && (
                <div className='flex md:overflow-hidden items-center p-1 max-w-full text-xs text-primary-main md:truncate rounded border'>
                    <div><Chat className='mr-2 w-6 stroke-primary-300' /></div>
                    <div className='md:overflow-hidden flex-1 text-xs md:truncate'>
                        {comment}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Default