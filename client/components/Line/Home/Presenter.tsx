import React from 'react'

type Props = {
    avatar: React.ReactNode,
    name: React.ReactNode,
    updateDate: React.ReactNode,
    bookmarks: React.ReactNode,
    groupSelector: React.ReactNode,
}

const Presenter: React.FC<Props> = ({
    avatar,
    name,
    updateDate,
    bookmarks,
    groupSelector
}) => {
    return (
        <div className=' flex justify-center w-full h-full'>
            <div className='mt-4 w-full'>
                <div className='flex justify-center'>
                    {avatar}
                </div>
                <div className='flex justify-center my-2 font-semibold text-primary-main'>{name}</div>
                <div className='p-4'>
                    <div className='flex items-center'>
                        <p className='text-primary-main'>ブックマーク一覧</p>
                        <hr className='flex-1 ml-2 border-primary-border border-dotted'/>
                    </div>
                    <div className='flex justify-end my-2'>
                        {groupSelector}
                    </div>
                    <ul>
                        {bookmarks}
                    </ul>
                    <div className='flex justify-end text-xs text-primary-400'>
                        {updateDate}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Presenter