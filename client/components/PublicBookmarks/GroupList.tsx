import React from 'react'
import Bookmark from './Bookmark'

type Props = {
    group: BookmarkGroup,
    bookmarks: Bookmark[],
    independents: Bookmark[],
    colors: string[]
}

const GroupList: React.FC<Props> = ({
    group,
    bookmarks,
    independents,
    colors
}) => {
    const groupList = colors.map(c => {
        const target = bookmarks.filter(b => b.color === c)
        const color = group.colors[c]
        return target.length > 0 ? (
            <div key={c}>
                <div className='flex items-center p-4 w-full text-primary-main'>
                    <div className='mr-2 w-3 h-3 rounded' style={{ backgroundColor: color.color }} />
                    <div>{color.name}</div>
                </div>
                <div>{target.map(b => (
                    <Bookmark bookmark={b} key={b.id} color={color} />
                ))}</div>
            </div>
        ) : null
    })
    return (
        <>
            {groupList}

            {independents.length > 0 && (
                <>
                    <div className='p-4 w-full text-primary-main'>その他</div>
                    <div>{independents.map(b => (
                        <Bookmark bookmark={b} key={b.id} />
                    ))}</div>
                </>
            )}
        </>
    )
}

export default GroupList