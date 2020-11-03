import React from 'react'
import Layout from './Layout'
import ListItem from './ListItem'

type Props = {
    bookmarks : Bookmark[]
}

const Content : React.FC<Props> = ({
    bookmarks
})=>{
    return (
        <Layout 
            refinements={<div/>}
            bookmarks={bookmarks}
            renderBookmark={(b)=>(<ListItem bookmark={b}/>)}
        />
    )
}

export default Content