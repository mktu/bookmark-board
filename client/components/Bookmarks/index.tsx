import React from 'react'
import GroupList from './GroupList'
import ItemList from './ItemList'
import Layout from './Layout'

const Bookmarks = ()=>{
    return (
        <Layout 
            groups={<GroupList />}
            bookmarks={<ItemList/>}
        />
    )
}

export default Bookmarks;