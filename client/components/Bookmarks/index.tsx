import React from 'react'
import { useRouter } from 'next/router'
import GroupList from './GroupList'
import Group from './Group'
import Layout from './Layout'
import { parseBookmarkRoutes } from '@utils/routes'

const Bookmarks = () => {
    const router = useRouter()
    const { ids } = router.query
    const { groupId, bookmarkId } = parseBookmarkRoutes(ids)
    return (
        <Layout
            showGroup={Boolean(groupId)}
            groups={<GroupList />}
            group={<Group {...{ groupId, bookmarkId }} />}
        />
    )
}

export default Bookmarks;