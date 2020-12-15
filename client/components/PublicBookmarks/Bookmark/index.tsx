import React, {useState} from 'react'
import Card from './Card'
import ListItem from './ListItem'

type Props = {
    bookmark : Bookmark
}

const Bookmark : React.FC<Props> = ({
    bookmark
})=>{
    const [cardView, setCardView] = useState(false)
    return (
        <a className='mt-2 cursor-pointer block hover:bg-primary-hover' target='_blank' rel='noopener noreferrer' href={bookmark.url} >
            {cardView ? (
                <Card bookmark={bookmark} showSimple={()=>{
                    setCardView(false)
                }}/> 
            ) : (
                <ListItem bookmark={bookmark} showDetail={()=>{
                    setCardView(true)
                }}/>
            )}
        </a>
    )
}

export default Bookmark