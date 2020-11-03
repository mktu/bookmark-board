import React, { useState, useContext } from 'react'
import { PlaceHolderImg } from '../../../Common/Image'

type Props = {
    bookmark : Bookmark
}

const ListItem : React.FC<Props>= ({
    bookmark
})=>{
    return (
        <div className='p-4 flex items-center'>
            <div>
                {bookmark.image ? (
                    <img src={bookmark.image} className='w-12'/>
                ) : (
                    <PlaceHolderImg className='w-12'/>
                )}
            </div>
            <div>

            </div>
        </div>
    )
}

export default ListItem