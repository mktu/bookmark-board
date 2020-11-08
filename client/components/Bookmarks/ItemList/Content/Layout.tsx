import React from 'react'

type Props = {
    bookmarks: Bookmark[]
    refinements: React.ReactNode,
    renderBookmark: (bookmark: Bookmark, idx:number) => React.ReactNode,
    input : React.ReactNode,
}

const Layout: React.FC<Props> = ({
    bookmarks,
    refinements,
    renderBookmark,
    input
}) => {
    return (
        <div className='flex flex-col items-center bg-primary-light h-full w-full'>
            <div className='p-2'>
                {refinements}
            </div>
            <div className='p-4 w-full'>
                {bookmarks.map((b,idx) => (
                    <div key={b.id}>
                        {renderBookmark(b,idx)}
                    </div>
                ))}
            </div>
            <div className='mt-auto w-full'>
                {input}
            </div>
        </div>
    )
}

export default Layout