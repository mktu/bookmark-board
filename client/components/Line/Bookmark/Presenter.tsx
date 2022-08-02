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
            <div className='w-full overflow-hidden p-4'>
                <div className='flex items-center'>
                    <div className='w-full flex-1'>
                        {title}
                    </div>
                </div>
            </div>
            {/* <div className='flex overflow-hidden justify-end items-center px-4 w-full'>
                <div className='ml-auto'>{refresh}</div>
                <div className='mx-1 text-sm text-primary-main'>情報を再取得</div>
            </div> */}

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
            <div className='mt-8 p-2 md:flex'>
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