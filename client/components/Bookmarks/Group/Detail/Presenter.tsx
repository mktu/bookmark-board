import React from 'react'
import { Label } from '../../../Common/Label'

type Props = {
    title: React.ReactNode,
    description: React.ReactNode,
    editorComponents: React.ReactNode,
    dangerZone: React.ReactNode,
    cancel: React.ReactNode,
    update: React.ReactNode,
    back : React.ReactNode,
    lastUpdate: string

}

const Presenter: React.FC<Props> = ({
    title,
    description,
    editorComponents,
    dangerZone,
    cancel,
    update,
    back,
    lastUpdate
}) => {
    return (
        <div className='p-2 w-full'>
            <div className='flex items-center w-full'>
                <div className='md:hidden mx-1'>
                    {back}
                </div>
                <div className='overflow-hidden flex-1'>
                    {title}
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
                <div className='p-2 w-full'>
                    {editorComponents}
                </div>
            </div>
            {dangerZone}
            <div className='flex justify-end mt-4 text-primary-main'>
                <div className='mx-2'>
                    {cancel}
                </div>
                {update}
            </div>
            <div className='flex justify-end mt-2 text-xs text-primary-main'>
                <div>
                    {lastUpdate}
                </div>
            </div>
        </div>
    )
}


export default Presenter