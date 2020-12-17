import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { useBookmarkById } from '../../../../modules/bookmarkSlice'
import { useGroupsByUser } from '../../../../modules/groupSlice'
import { useProfile } from '../../../../modules/profileSlice'
import FirebaseContext from '../../../../context/FirebaseContext'
import { fetchLinkPreview } from '../../../../logics'
import Presenter from './Presenter'

type Props = {
    bookmarkId: string
}

const Container: React.FC<Props> = ({
    bookmarkId
}) => {
    const profile = useProfile()
    const router = useRouter()
    const groups = useGroupsByUser(profile.id)
    const bookmark = useBookmarkById(bookmarkId)
    const group = groups.find(g => bookmark && g.id === bookmark.groupId)
    const { clientService } = useContext(FirebaseContext)
    const [status, setStatus] = useState<LoadStatus['status']>('loaded')
    const [moveDest, setMoveDest] = useState(group)
    const updateBookmark = (key: keyof Bookmark) => (value: string) => {
        clientService.modifyBookmark(bookmark.groupId, bookmark.id, {
            [key]: value
        })
    }
    if (!bookmark) {
        return <div />
    }
    const likes = bookmark.reactions['likes'] || []
    const sentLikes = likes.includes(profile.id)
    const handleRefetch = () => {
        setStatus('loading')
        fetchLinkPreview(bookmark.url).then(result => {
            clientService.modifyBookmark(bookmark.groupId, bookmark.id, {
                title: result.title,
                description: result.description || '',
                image: result.images.length > 0 && result.images[0]
            }, () => {
                setStatus('loaded')
            }, (err) => {
                setStatus('failed')
                console.error(err)
            })
        })
    }
    const handleLikes = () => {
        clientService.modifyBookmark(bookmark.groupId, bookmark.id, {
            reactions: {
                ...bookmark.reactions,
                likes: sentLikes ? likes.filter(t => t !== profile.id) : Array.from(new Set([...likes, profile.id]))
            }
        })
    }
    const handleMove = () => {
        clientService.moveGroup(bookmark, moveDest.id, () => {
            router.push(`/bookmarks/[[...ids]]`, `/bookmarks/${group.id}`, { shallow: true })
        })
    }

    const handleSelectMoveDest = (s: string) => {
        setMoveDest(groups.find(g => g.id === s))
    }

    const handleJumpLink = () => {
        window && window.open(
            bookmark.url,
            '_blank'
        );
    }
    return (
        <Presenter
            bookmark={bookmark}
            groups={groups}
            likes={likes}
            sentLikes={sentLikes}
            moveDest={moveDest}
            status={status}
            handleLikes={handleLikes}
            handleRefetch={handleRefetch}
            updateBookmark={updateBookmark}
            handleSelectMoveDest={handleSelectMoveDest}
            handleMove={handleMove}
            handleJumpLink={handleJumpLink}
        />
    )
}

export default Container