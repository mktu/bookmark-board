import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Avatar from '../Common/Avatar/AvatarImage'
import Bookmark from './Bookmark'
import { numberToDateTime } from '../../utils'
import { HeartButton, SvgIconButton, ContainedButton } from '../Common/Button'
import { PopoverDivContainer } from '../Common/Popover'
import { UserPopover } from '../PopoverMenu'
import CommentInput from './CommentInput'
import Comments from './Comments'
import useReactionListener from '../../hooks/useReactionListener'
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
    const router = useRouter()
    const { clientService } = useContext(FirebaseContext)
    const { reactions, status, getReactionByUid } = useReactionListener(group.id, 'likes')
    const myReaction = getReactionByUid(profile.id)
    const handleLogin = ()=>{
        router.push('/signin')
    }
    return (
        <div className='w-screen flex flex-col items-center justify-center py-8'>
            <div className='flex w-7/12'>
                <h1 className='text-2xl font-semibold'>
                    {group.name}
                </h1>
                <div className='ml-auto flex items-center'>
                    <PopoverDivContainer placement='bottom' content={<UserPopover user={editor} />}>
                        <SvgIconButton>
                            <Avatar src={editor.image} width='48px' height='48px' name={editor.name} />
                        </SvgIconButton>
                    </PopoverDivContainer>
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
                <HeartButton
                    disabled={status === 'loading' || !profile.id}
                    active={Boolean(myReaction)}
                    counter={reactions.length > 0 && reactions.length}
                    onClick={() => {
                        myReaction ? clientService.deleteReaction(group.id, myReaction.id) :
                            clientService.addReaction({
                                type: 'likes',
                                targetId: group.id
                            })
                    }} />
            </div>
            <div className='w-7/12 p-2 flex flex-col justify-center'>
                {bookmarks.map(b => (
                    <Bookmark bookmark={b} key={b.id} />
                ))}
            </div>
            <div className='w-7/12 p-2 mt-4'>
                <h2 className='text-primary-main mb-2'>コメント</h2>
                <Comments groupId={group.id} />
                {profile.id ? (
                    <CommentInput className='mt-4' groupId={group.id} />
                ) : (
                        <div className='flex justify-center py-6'>
                            <ContainedButton onClick={handleLogin}>ログインまたはサインアップする</ContainedButton>
                        </div>
                    )}
            </div>

        </div>
    )
}

export default PublicBookmarks