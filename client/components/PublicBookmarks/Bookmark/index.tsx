import React, {useState} from 'react'
import Card from './Card'
import ListItem from './ListItem'

type Props = {
    bookmark : Bookmark,
    color ?: BookmarkColorDescription
}

const Bookmark : React.FC<Props> = ({
    bookmark,
    color
})=>{
    const [cardView, setCardView] = useState(false)
    return (
        <div className='my-2 md:my-1'>
            {cardView ? (
                <Card bookmark={bookmark} showSimple={()=>{
                    setCardView(false)
                }}/> 
            ) : (
                <ListItem bookmark={bookmark} color={color} showDetail={()=>{
                    setCardView(true)
                }}/>
            )}
        </div>
    )
}

export default Bookmark