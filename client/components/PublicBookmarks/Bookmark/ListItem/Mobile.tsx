import React from 'react'
import Chat from '@components/Common/Icon/Chat'
import Link from 'components/Common/Icon/Link'
import { hex2rgb } from '@utils/rgb'

type Props = {
    title: string,
    description: string,
    comment?: string,
    image: React.ReactNode,
    color?: string,
    host?: string,
    url: string
}

const Mobile: React.FC<Props> = ({
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
        <div className='rounded border border-primary-border p-2'>
            <a target='_blank' rel='noopener noreferrer' href={url} className='block max-w-full overflow-hidden text-ellipsis p-1 text-sm text-primary-dark underline'>{title}</a>
            <div className='my-2 border-b-2 border-primary-border' style={color ? { borderColor: `rgba(${r},${g},${b},0.5)` } : undefined} />
            <div className='flex py-2'>
                <div className='flex items-center justify-center'>
                    {image}
                </div>
                <div className='ml-2 flex w-full flex-1 flex-col overflow-hidden border-l border-primary-border pl-2' >
                    <div className='max-w-full overflow-hidden text-ellipsis text-xs text-primary-main'>
                        {(description && description.length > 100) ? description.substring(0, 100) + '...' : description}
                    </div>
                    <div className='mt-auto flex max-w-full items-center justify-end overflow-hidden text-ellipsis text-xs text-primary-main'>
                        <Link className='mr-1 w-4 stroke-primary-main' />
                        <span>{host}</span>
                    </div>
                </div>
            </div>
            {comment && (
                <div className='flex max-w-full items-center rounded border p-1 text-xs text-primary-main md:overflow-hidden md:truncate'>
                    <div><Chat className='mr-2 w-6 stroke-primary-300' /></div>
                    <div className='flex-1 text-xs md:overflow-hidden md:truncate'>
                        {comment}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Mobile