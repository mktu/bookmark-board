import React from 'react'

type Props = {
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
    back: React.ReactNode
}

const Presenter: React.FC<Props> = ({
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
    cancel,
    back
}) => {
    return (
        <div className='flex flex-col'>
            <div className='w-full overflow-hidden p-4'>
                <div className='flex items-center'>
                    <div className='md:hidden mr-1'>{back}</div>
                    <div className='w-full flex-1'>
                        {title}
                    </div>
                    <div>
                        {heart}
                    </div>
                </div>
            </div>
            <div className='flex items-center w-full overflow-hidden px-4 justify-end'>
                <div>{refresh}</div>
                <div className='text-sm text-primary-main mx-1'>情報を再取得</div>
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