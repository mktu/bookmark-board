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
        <div className='w-full h-full flex items-center justify-center'>
            <div className='text-primary-main p-4'>
                <div className='text-xl text-primary-main  mb-12'>
                    <span className='mx-1'>{userName}</span>
                    <span>さんの利用状況</span>
                </div>
                <div>
                    <BookmarkHome width={300} height={187} />
                </div>
                <div className='my-4'>
                    <div>登録グループ数 : <span className='text-primary-dark'>{groups} / {MaxGroupNumber}</span> </div>
                    <div>登録ブックマーク数 : <span className='text-primary-dark'>{bookmarks} / {MaxGroupNumber * MaxBookmarkNumber}</span></div>
                    <div>最近登録したブックマーク</div>
                </div>
                <div>
                    {recentCreated}
                </div>
            </div>
        </div>
    )
}

export default Presenter