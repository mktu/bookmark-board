import React from 'react'

type Props = {
    bookmarks : Bookmark[]
    refinements : React.ReactNode,
    renderBookmark : (bookmark:Bookmark)=>React.ReactNode
}

const Layout : React.FC<Props> = ({
    bookmarks,
    refinements,
    renderBookmark
})=>{
    return (
        <div className='flex flex-col items-center justify-center bg-primary-light'>
            <div className='p-2'>
                {refinements}
            </div>
            <div className='p-4'>
                {bookmarks.map(b=>(
                    <div className='mb-2' key={b.id}>
                        {renderBookmark(b)}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Layout