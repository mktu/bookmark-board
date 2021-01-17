import React from 'react'
import { useRouter } from 'next/router'
import GroupList from './GroupList'
import Group from './Group'
import Layout from './Layout'

const Bookmarks = ()=>{
    const router = useRouter()
    const { ids } = router.query
    const groupId = ids && ids.length > 0 ? ids[0] : ''
    const bookmarkId = ids && ids.length > 1 ? ids[1] : ''
    const settingMode = bookmarkId === 'setting'
    const shareMode = bookmarkId === 'share'
    return (
        <Layout 
            showGroup={Boolean(groupId)}
            groups={<GroupList />}
            group={<Group {...{groupId, bookmarkId, settingMode, shareMode}}/>}
        />
    )
}

export default Bookmarks;