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
                <div className='w-full p-4 text-primary-main flex items-center'>
                    <div className='w-3 h-3 rounded mr-2' style={{ backgroundColor: color.color }} />
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
                    <div className='w-full p-4 text-primary-main'>その他</div>
                    <div>{independents.map(b => (
                        <Bookmark bookmark={b} key={b.id} />
                    ))}</div>
                </>
            )}
        </>
    )
}

export default GroupList