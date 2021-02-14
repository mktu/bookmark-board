import React, { useContext, useMemo, useCallback } from 'react'
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
import GroupList from './GroupList'
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
    const definedColors = useMemo(() => group.colors ? Object.keys(group.colors).sort((a, b) => {
        return group.colors[a].idx - group.colors[b].idx
    }) : [], [group])
    const independents = useMemo(() => bookmarks.filter(b => !definedColors.includes(b.color)), [definedColors, bookmarks])
    const hasColor = independents.length !== bookmarks.length && definedColors.length > 0
    const handleLogin = useCallback(() => {
        router.push('/signin')
    }, [router])
    const handleLike = useCallback(() => {
        myReaction ? clientService.deleteReaction(group.id, myReaction.id) :
            clientService.addReaction({
                type: 'likes',
                targetId: group.id
            })
    }, [clientService, myReaction, group])

    const editorIcon = useMemo(() => <Editor image={editor.image} name={editor.name} />, [editor])
    const heartIcon = useMemo(() => <Heart
        disabled={status === 'loading' || !profile.id}
        active={Boolean(myReaction)}
        counter={reactions.length > 0 && reactions.length}
        onClick={handleLike} />, [reactions, handleLike, profile, myReaction, status])
    const bookmarkList = useMemo(() => hasColor ?
        <GroupList bookmarks={bookmarks} independents={independents} colors={definedColors} group={group} />
        : bookmarks.map(b => (<Bookmark bookmark={b} key={b.id} />)), [bookmarks, independents, definedColors, group, hasColor])
    const comments = useMemo(() => <Comments groupId={group.id} />, [group.id])
    const commentInput = useMemo(() => profile.id && <CommentInput className='mt-4' groupId={group.id} />, [profile, group.id])
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
                bookmarks: bookmarkList,
                comments,
                commentInput,
                signup,
                editorPopover
            }}

        />
    )
}

export default Container