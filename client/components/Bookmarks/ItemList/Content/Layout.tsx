import React from 'react'

type Props = {
    bookmarkIds: string[]
    refinements: React.ReactNode,
    renderBookmark: (bookmarkId: string, idx: number) => React.ReactNode,
    input: React.ReactNode,
}

const Layout: React.FC<Props> = ({
    bookmarkIds,
    refinements,
    renderBookmark,
    input
}) => {
    return (
        <div className='flex flex-col items-center bg-primary-light h-full w-full relative'>
            <div className='flex flex-col items-center h-full w-full'>
                <div className='w-full'>
                    {refinements}
                </div>
                <div className='overflow-scroll w-full p-2'>
                    {bookmarkIds.map((id, idx) => (
                        <div key={id}>
                            {renderBookmark(id, idx)}
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-full'>
                {input}
            </div>
        </div>
    )
}

export default Layout