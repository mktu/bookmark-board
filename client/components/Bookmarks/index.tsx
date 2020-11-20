import React from 'react'
import GroupList from './GroupList'
import Group from './Group'
import Layout from './Layout'

const Bookmarks = ()=>{
    return (
        <Layout 
            groups={<GroupList />}
            group={<Group/>}
        />
    )
}

export default Bookmarks;