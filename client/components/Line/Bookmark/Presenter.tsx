import React from 'react'

type Props = {
    title: React.ReactNode,
    description: React.ReactNode,
    comment: React.ReactNode,
    url: React.ReactNode,
    refresh: React.ReactNode,
    color: React.ReactNode,
    date: React.ReactNode,
    image: React.ReactNode,
    submit: React.ReactNode,
    cancel: React.ReactNode,
}

const Presenter: React.FC<Props> = ({
    title,
    description,
    comment,
    url,
    color,
    date,
    image,
    submit,
    cancel,
}) => {
    return (
        <div className='flex flex-col'>
            <div className='overflow-hidden p-4 w-full'>
                <div className='flex items-center'>
                    <div className='flex-1 w-full'>
                        {title}
                    </div>
                </div>
            </div>
            {/* <div className='flex overflow-hidden justify-end items-center px-4 w-full'>
                <div className='ml-auto'>{refresh}</div>
                <div className='mx-1 text-sm text-primary-main'>情報を再取得</div>
            </div> */}

            <div className='overflow-hidden p-4 w-full'>
                {image}
            </div>
            <div className='overflow-hidden p-4 w-full'>
                {description}
            </div>
            <div className='overflow-hidden p-4 w-full'>
                {url}
            </div>
            <div className='overflow-hidden p-4 w-full'>
                {comment}
            </div>
            <div className='overflow-hidden p-4 w-full'>
                {color}
            </div>
            <div className='md:flex p-2 mt-8'>
                <div className='flex flex-col items-end ml-auto'>
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