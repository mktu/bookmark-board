import React from 'react'
import { TooltipDivContainer } from '../../../Common/Tooltip'

type Props = {
    status: LoadStatus['status'],
    title: React.ReactNode,
    heart: React.ReactNode,
    description: React.ReactNode,
    comment: React.ReactNode,
    url: React.ReactNode,
    refresh: React.ReactNode,
    color: React.ReactNode,
    move: React.ReactNode,
    date: React.ReactNode,
    image: React.ReactNode,
    trash: React.ReactNode,
    submit: React.ReactNode,
    cancel: React.ReactNode,
}

const Presenter: React.FC<Props> = ({
    status,
    title,
    heart,
    description,
    comment,
    url,
    refresh,
    color,
    move,
    date,
    image,
    trash,
    submit,
    cancel
}) => {
    const inputDisabled = status === 'loading'
    return (
        <div className='flex flex-col'>
            <div className='w-full overflow-hidden p-4'>
                <div className='flex items-center'>
                    <div className='w-full flex-1'>
                        {title}
                    </div>
                    <TooltipDivContainer disabled={inputDisabled} content='説明や画像の情報を再度取得します' placement='bottom' className='mx-4'>
                        {refresh}
                    </TooltipDivContainer>
                    <div>
                        {heart}
                    </div>
                </div>
            </div>
            <div className='w-full overflow-hidden p-4'>
                {image}
            </div>
            <div className='w-full overflow-hidden p-4'>
                {description}
            </div>
            <div className='w-full overflow-hidden p-4'>
                {url}
            </div>
            <div className='w-full overflow-hidden p-4'>
                {comment}
            </div>
            <div className='w-full overflow-hidden p-4'>
                {color}
            </div>
            <div className='w-full overflow-hidden p-4'>
                {move}
            </div>
            <div className='p-2 mt-8 md:flex'>
                <div >
                    {trash}
                </div>
                <div className='ml-auto flex flex-col items-end'>
                    <div className='flex items-center p-2'>
                        <div className='mx-2'>{cancel}</div>
                        <div>{submit}</div>
                    </div>
                    {date}
                </div>
            </div>
        </div>
    )
}

export default Presenter