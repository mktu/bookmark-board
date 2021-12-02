import React from 'react'
import ProfilePlaceholder from './ProfilePlaceholder'
import BookmarkPlaceholder from './BookmarkPlaceholder'

type Props = {
    avatar: React.ReactNode,
    name: React.ReactNode,
    bookmarks: React.ReactNode,
    groupSelector: React.ReactNode,
}

const Presenter: React.FC<Props> = ({
    avatar,
    name,
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
                        <hr className='flex-1 ml-2 border-primary-border border-dotted' />
                    </div>
                    <div className='flex justify-end my-2'>
                        {groupSelector}
                    </div>
                    <ul>
                        {bookmarks}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export const WaitForAll: React.VFC = () => (
    <div className=' flex justify-center w-full h-full'>
        <div className='mt-4 w-full'>
            <ProfilePlaceholder />
            <BookmarkPlaceholder />
        </div>
    </div>
)

export const WaitForBookmarks: React.FC<Omit<Props, 'bookmarks'|'groupSelector'>> = ({
    avatar,
    name,
}) => {
    return (
        <div className=' flex justify-center w-full h-full'>
            <div className='mt-4 w-full'>
                <div className='flex justify-center'>
                    {avatar}
                </div>
                <div className='flex justify-center my-2 font-semibold text-primary-main'>{name}</div>
                <div className='p-4'>
                    <BookmarkPlaceholder />
                </div>
            </div>
        </div>
    )
}

export default Presenter