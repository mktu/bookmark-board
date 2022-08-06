import React from 'react'
import { FolderOpen } from '../../Common/Icon'

type Props = {
    bookmarkGroup: BookmarkGroup,
    style: React.CSSProperties
}

const Preview: React.FC<Props> = ({
    bookmarkGroup,
    style
}) => {
    return (
        <button className=' flex w-full items-center p-2 text-primary-main' style={style}>
            <div>
                <FolderOpen className='w-8 stroke-primary-main' strokeWidth={1} />
            </div>
            <div className='ml-2'>{bookmarkGroup.name}</div>
        </button>
    )
}

export default Preview