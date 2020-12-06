import React, { useContext } from 'react'
import Avatar from '../Common/Avatar'
import ListItem from './ListItem'
import { numberToDateTime } from '../../utils'
import { SvgFillIconButton } from '../Common/Button'
import { HeartFill } from '../Common/Icon'
import CommentInput from './CommentInput'
import Comments from './Comments'
import { useReactionListener } from '../../hooks'
import { useProfile } from '../../modules/profileSlice'
import FirebaseContext from '../../context/FirebaseContext'

type Props = {
    group: BookmarkGroup,
    editor: Profile,
    bookmarks: Bookmark[]
}

const PublicBookmarks: React.FC<Props> = ({
    group,
    editor,
    bookmarks
}) => {
    const profile = useProfile()
    const { clientService } = useContext(FirebaseContext)
    const { reactions, status, getReactionByUid } = useReactionListener(group.id, 'likes')
    const myReaction = getReactionByUid(profile.id)
    return (
        <div className='w-screen flex flex-col items-center justify-center py-8'>
            <div className='flex w-7/12'>
                <h1 className='text-2xl font-semibold'>
                    {group.name}
                </h1>
                <div className='ml-auto flex items-center'>
                    <Avatar src={editor.image} width='48px' height='48px' />
                    <div className='ml-2 text-primary-main'>
                        <div>
                            {editor.name}
                        </div>
                        <div className='text-xs'>
                            {numberToDateTime(group.lastUpdate)}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex w-7/12 p-4 mt-2 text-primary-main text-sm whitespace-pre-wrap'>
                {group.description}
            </div>
            <div className='flex w-7/12 px-2 justify-end items-end'>
                <SvgFillIconButton colorType={myReaction ? 'dark-active' : 'dark'} disabled={status === 'loading'} onClick={() => {
                    myReaction ? clientService.deleteReaction(group.id, myReaction.id) :
                        clientService.addReaction({
                            type: 'likes',
                            targetId: group.id
                        })
                }}>
                    <HeartFill className='w-6' />
                </SvgFillIconButton>
                {reactions.length > 0 && (<div className='text-xs text-primary-main'>{reactions.length}</div>)}
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
                <Comments groupId={group.id} />
                <CommentInput className='mt-4' groupId={group.id} />
            </div>
        </div>
    )
}

export default PublicBookmarks