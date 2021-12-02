import { useEffect, useState } from 'react'
import Presenter, { WaitForBookmarks, WaitForAll } from './Presenter'
import { useProfile } from '@hooks/useLiffProfile'
import { useBookmarks } from '@hooks/useLiffBookmark'
import { useGroups } from '@hooks/useLiffBookmarkGroups'
import Avatar from '@components/Common/Avatar/NextImage'
import UrlImage from '@components/Common/Avatar/UrlImage'
import { BookmarkListImageSize } from '@utils/constants'
import ListItem from './ListItem'
import Group from './Group'

const Container: React.VFC = () => {
    const { profile, fetching: profileFetching } = useProfile()
    const { groups } = useGroups()
    const [selectedGroup, setGroup] = useState('')
    const { bookmarks, fetching: bookmarkFetcing } = useBookmarks(selectedGroup)
    const { name, image } = profile || {}

    useEffect(() => {
        if (profile?.lineInfo?.defaultGroup) {
            setGroup(profile.lineInfo.defaultGroup)
        }
    }, [profile?.lineInfo?.defaultGroup])

    if (!profile || profileFetching) {
        return <WaitForAll />
    }

    const bookmarkList = bookmarkFetcing ? <div /> : bookmarks.map(v => {
        const origin = new URL(v.url)
        const image = <UrlImage className='rounded' enableEndpoint={!v.disableEndpoint} width={BookmarkListImageSize} height={BookmarkListImageSize} src={v.image} name={v.title} />
        return (
            <li key={v.id} className='mb-2'>
                <ListItem
                    title={v.title}
                    url={v.url}
                    description={v.description}
                    comment={v.comment}
                    host={origin.host}
                    image={image}
                />
            </li>
        )
    })

    const groupSelector = (
        <Group groups={groups} selected={selectedGroup} handleUpdate={setGroup} />
    )
    const avatar = (
        <Avatar
            src={image}
            width={192}
            height={192}
            name={name} />
    )
    return bookmarkFetcing ? (
        <WaitForBookmarks avatar={avatar} name={name} />
    ) : (
        <Presenter
            {...{
                name,
                avatar,
                bookmarks: bookmarkList,
                groupSelector
            }}
        />
    )
}

export default Container