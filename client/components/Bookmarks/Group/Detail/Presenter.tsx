import React from 'react'
import { Label } from '../../../Common/Label'

type Props = {
    title: React.ReactNode,
    description: React.ReactNode,
    editorComponents: React.ReactNode,
    dangerZone: React.ReactNode,
    cancel: React.ReactNode,
    update: React.ReactNode,
    back: React.ReactNode,
    lastUpdate: string
    emoji: React.ReactNode
}

const Presenter: React.FC<Props> = ({
    title,
    description,
    editorComponents,
    dangerZone,
    cancel,
    update,
    back,
    lastUpdate,
    emoji
}) => {
    return (
        <div className='w-full p-2'>
            <div className='mx-1 my-2 md:hidden'>
                {back}
            </div>
            <div className='flex w-full items-center'>
                <div className='flex-1 overflow-hidden'>
                    {title}
                </div>
                <div>
                    {emoji}
                </div>
            </div>
            <div className='mt-2'>
                <div className='w-full'>
                    {description}
                </div>
            </div>
            <div className='mt-2'>
                <div className='w-full'>
                    <Label textSize='text-xs'>編集者</Label>
                </div>
                <div className='w-full p-2'>
                    {editorComponents}
                </div>
            </div>
            {dangerZone}
            <div className='mt-4 flex justify-end text-primary-main'>
                <div className='mx-2'>
                    {cancel}
                </div>
                {update}
            </div>
            <div className='mt-2 flex justify-end text-xs text-primary-main'>
                <div>
                    {lastUpdate}
                </div>
            </div>
        </div>
    )
}


export default Presenter