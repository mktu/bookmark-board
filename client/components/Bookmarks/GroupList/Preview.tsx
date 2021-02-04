import React from 'react'
import { FolderOpen } from '../../Common/Icon'

type Props = {
    bookmarkGroup: BookmarkGroup,
    style : React.CSSProperties
}

const Preview: React.FC<Props> = ({
    bookmarkGroup,
    style
}) => {
    return (
        <button className='w-full flex text-primary-main items-center p-2 ' style={style}>
            <div>
                <FolderOpen className='w-8 stroke-primary-main' strokeWidth={1} />
            </div>
            <div className='ml-2'>{bookmarkGroup.name}</div>
        </button>
    )
}

export default Preview