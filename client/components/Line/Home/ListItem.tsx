import React from 'react'
import Chat from '@components/Common/Icon/Chat'
import Link from '@components//Common/Icon/Link'
import Edit from '@components//Common/Icon/EditFill'
import { SvgFillIconButton } from '@components//Common/Button'
import { hex2rgb } from '@utils/rgb'

type Props = {
    title: string,
    editLink : string,
    description: string,
    comment?: string,
    image: React.ReactNode,
    color?: string,
    host?: string,
    url: string
}

const Default: React.FC<Props> = ({
    title,
    editLink,
    description,
    comment,
    image,
    color,
    host,
    url
}) => {
    const [r, g, b] = hex2rgb(color)
    return (
        <div className='relative rounded border border-primary-border p-2'>
            <div className='flex'>
                <SvgFillIconButton className='absolute -left-5 -top-4 mr-2 rounded-full border bg-white fill-primary-400 p-2' onClick={()=>{
                    window && window.open(editLink)
                }}>
                    <Edit className='h-5 w-5'/>
                </SvgFillIconButton>
            <a target='_blank' rel='noopener noreferrer' href={url} className='block max-w-full flex-1 overflow-hidden text-ellipsis p-1 text-sm text-primary-dark underline'>{title}</a>
            </div>
            <div className='my-2 border-b-2 border-primary-border' style={{ borderColor: color && `rgba(${r},${g},${b},0.5)` }} />
            <div className='flex py-2'>
                <div className='flex items-center justify-center'>
                    {image}
                </div>
                <div className='ml-2 flex w-full flex-1 flex-col overflow-hidden border-l border-primary-border pl-2' >
                    <div className='max-w-full overflow-hidden text-ellipsis text-xs text-primary-main'>
                        {(description && description.length > 100) ? description.substr(0, 100) + '...' : description}
                    </div>
                    <div  className='mt-auto flex max-w-full items-center justify-end overflow-hidden text-ellipsis text-xs text-primary-main'>
                        <Link className='mr-1 w-4 stroke-primary-main'/>
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

export default Default