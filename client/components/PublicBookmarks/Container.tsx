import React, { useMemo } from 'react'
import { numberToDateTime } from '../../utils'
import DefaultPresenter from './Presenter'
import Editor from './Icon/Editor'
import Heart from './Icon/Heart'
import Bookmark from './Bookmark'
import { ContainedButton } from '../Common/Button'
import CommentInput from './CommentInput'
import Comments from './Comments'
import GroupList from './GroupList'
import { UserPopover } from '../PopoverMenu'
import usePublicBookmarks from '@hooks/usePublicBookmarks'

type Props = {
    group: BookmarkGroup,
    editor: Profile,
    bookmarks: Bookmark[],
    initReactions: Reaction[]
}

const Container: React.FC<Props> = ({
    group,
    editor,
    bookmarks,
    initReactions
}) => {
    const { 
        reactions,
        myReaction, 
        profile, 
        hasColor, 
        independents, 
        definedColors, 
        enableLike,
        handleLike, 
        handleLogin, 
    } = usePublicBookmarks(group,bookmarks)
    const counter = reactions.length > 0 ? reactions.length : initReactions.length
    const editorIcon = useMemo(() => <Editor image={editor.image} name={editor.name} />, [editor])
    const heartIcon = useMemo(() => <Heart
        disabled={!enableLike}
        active={Boolean(myReaction)}
        counter={counter > 0 && counter}
        onClick={handleLike} />, [counter, handleLike, myReaction, enableLike])
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