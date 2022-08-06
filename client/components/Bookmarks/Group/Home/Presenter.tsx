import React from 'react'
import Link from 'next/link'
import { BookmarkHome } from '@components/Common/Image'
import LoginIcon from '@components/Common/Icon/LineLogin'
import ExternalLink from '@components/Common/Icon/ExternalLink'
import { MaxGroupNumber, MaxBookmarkNumber, PluginUrl } from '@utils/constants'

type Props = {
    userName: string,
    groups: number,
    bookmarks: number,
    recentCreated: React.ReactNode,
    showMore: React.ReactNode,
}

const profileUrl = '/profile'

const Presenter: React.FC<Props> = ({
    userName,
    groups,
    bookmarks,
    recentCreated,
    showMore
}) => {
    return (
        <div className='flex h-full w-full items-center justify-center bg-white'>
            <div className='w-full p-4 text-primary-main lg:w-4/5'>
                <div className='flex flex-col items-center justify-center'>
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
                        <div >
                            連携機能 :
                            <ul className='list-inside list-disc px-2'>
                                <li>
                                    <a href={PluginUrl} target='_blank' rel='noopener noreferrer' className='inline-flex items-center text-sm text-primary-dark underline'>
                                        <span>Chrome拡張を利用する</span>
                                        <ExternalLink className='ml-1 h-5 w-5 stroke-primary-dark' strokeWidth={1.5} />
                                    </a>

                                </li>
                                <li>
                                    <Link href={profileUrl}>
                                        <a href={profileUrl} className='inline-flex items-center text-sm text-primary-dark underline'>
                                            <LoginIcon strokeWidth={1.5} className='mr-1 h-5 w-5' />
                                            <span>LINE連携を行う</span>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='w-full border-t border-primary-border'>
                    <h6 className='my-2 text-sm font-semibold'>最近登録したブックマーク</h6>
                    <div className='px-2'>
                        {recentCreated}
                    </div>
                    <div className='flex py-4 text-sm text-primary-main'>
                        {showMore}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Presenter