import React from 'react'
import { BookmarkHome } from '@components/Common/Image'
import { MaxGroupNumber, MaxBookmarkNumber } from '@utils/constants'

type Props = {
    userName: string,
    groups: number,
    bookmarks: number,
    recentCreated: React.ReactNode
}

const Presenter: React.FC<Props> = ({
    userName,
    groups,
    bookmarks,
    recentCreated
}) => {
    return (
        <div className='flex justify-center items-center w-full h-full'>
            <div className='p-4 w-full text-primary-main lg:w-4/5'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='mb-12 text-xl text-primary-main'>
                        <span className='mx-1'>{userName}</span>
                        <span>さんのBookmarks</span>
                    </div>
                    <div>
                        <BookmarkHome width={300} height={187} />
                    </div>
                    <div className='my-4'>
                        <div>登録グループ数 : <span className='text-primary-dark'>{groups} / {MaxGroupNumber}</span> </div>
                        <div>登録ブックマーク数 : <span className='text-primary-dark'>{bookmarks} / {MaxGroupNumber * MaxBookmarkNumber}</span></div>
                    </div>
                </div>
                <div className='w-full border-t border-primary-border'>
                    <h6 className='my-2 text-sm font-semibold'>最近登録したブックマーク</h6>
                    <div className='px-2'>
                        {recentCreated}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Presenter