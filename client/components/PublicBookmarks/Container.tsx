import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { numberToDateTime } from '../../utils'
import DefaultPresenter from './Presenter'
import Editor from './Icon/Editor'
import Heart from './Icon/Heart'
import useReactionListener from '../../hooks/useReactionListener'
import { useProfile } from '../../modules/profileSlice'
import Bookmark from './Bookmark'
import { ContainedButton } from '../Common/Button'
import CommentInput from './CommentInput'
import Comments from './Comments'
import { UserPopover } from '../PopoverMenu'
import FirebaseContext from '../../context/FirebaseContext'

type Props = {
    group: BookmarkGroup,
    editor: Profile,
    bookmarks: Bookmark[]
}

const Container: React.FC<Props> = ({
    group,
    editor,
    bookmarks
}) => {
    const profile = useProfile()
    const router = useRouter()
    const { clientService } = useContext(FirebaseContext)
    const { reactions, status, getReactionByUid } = useReactionListener(group.id, 'likes')
    const myReaction = getReactionByUid(profile.id)
    const handleLogin = () => {
        router.push('/signin')
    }
    const handleLike = () => {
        myReaction ? clientService.deleteReaction(group.id, myReaction.id) :
            clientService.addReaction({
                type: 'likes',
                targetId: group.id
            })
    }
    const editorIcon = <Editor image={editor.image} name={editor.name} />
    const heartIcon = <Heart
        disabled={status === 'loading' || !profile.id}
        active={Boolean(myReaction)}
        counter={reactions.length > 0 && reactions.length}
        onClick={handleLike} />
    const bookmarkList = bookmarks.map(b => (<Bookmark bookmark={b} key={b.id} /> ))
    const comments = <Comments groupId={group.id} />
    const commentInput = profile.id &&  <CommentInput className='mt-4' groupId={group.id} />
    const signup = !profile.id && <ContainedButton onClick={handleLogin}>ログインまたはサインアップする</ContainedButton>
    const editorPopover = <UserPopover user={editor} />

    return (
        <DefaultPresenter
            {...{
                editorIcon,
                name: group.name,
                description: group.description,
                editorName: editor.name,
                updated: numberToDateTime(group.lastUpdate),
                heartIcon,
                bookmarks : bookmarkList,
                comments,
                commentInput,
                signup,
                editorPopover
            }}

        />
    )
}

export default Container