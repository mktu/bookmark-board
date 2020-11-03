import React from 'react'

type Props = {
    groups: React.ReactNode,
    bookmarks: React.ReactNode,
}

const Layout = ({
    groups,
    bookmarks,
}: Props) => {
    return (
        <div className='w-full h-full flex flex-row'>
            <div className='h-full w-3/12'>{groups}</div>
            <div className='h-full w-9/12'>{bookmarks}</div>
        </div>
    )
}

export default Layout;