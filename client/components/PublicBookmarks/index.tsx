import React from 'react'
import Avatar from '../Common/Avatar'
import ListItem from './ListItem'
import { numberToDateTime } from '../../utils'
import { SvgIconButton } from '../Common/Button'
import { HeartFill } from '../Common/Icon'
import CommentInput from './CommentInput'

type Props = {
    group: BookmarkGroup,
    profile: Profile,
    bookmarks: Bookmark[]
}

const PublicBookmarks: React.FC<Props> = ({
    group,
    profile,
    bookmarks
}) => {
    return (
        <div className='w-screen flex flex-col items-center justify-center py-8'>
            <div className='flex w-7/12'>
                <h1 className='text-2xl font-semibold'>
                    {group.name}
                </h1>
                <div className='ml-auto flex items-center'>
                    <Avatar src={profile.image} width='48px' height='48px' />
                    <div className='ml-2 text-primary-main'>
                        <div>
                            {profile.name}
                        </div>
                        <div className='text-xs'>
                            {numberToDateTime(group.lastUpdate)}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex w-7/12 p-2'>
                説明・・・
            </div>
            <div className='flex w-7/12 p-2 justify-end'>
                <SvgIconButton colorType='none'>
                    <HeartFill className='w-6 fill-primary-main hover:fill-primary-dark'/>
                </SvgIconButton>
            </div>
            <div className='w-7/12 p-2 flex flex-col justify-center'>
                {bookmarks.map(b => (
                    <div key={b.id} className='mt-2'>
                        <ListItem bookmark={b} />
                    </div>
                ))}
            </div>
            <div className='w-7/12 p-2 mt-4'>
                <h2 className='text-primary-main mb-2'>コメント</h2>
                <CommentInput />
            </div>
        </div>
    )
}

export default PublicBookmarks