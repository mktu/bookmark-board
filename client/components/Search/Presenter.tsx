import React from 'react'

type Props = {
    searchRefinements : React.ReactNode,
    bookmarkList : React.ReactNode,
}

const Presenter : React.FC<Props> = ({
    searchRefinements,
    bookmarkList
}) => {
    return (
        <div className='w-full h-full p-4 flex flex-col'>
            <div className='p-4'>
                {searchRefinements}
            </div>
            <div className='flex-1 p-4 overflow-y-auto'>
                {bookmarkList}
            </div>
        </div>
    )
}

export default Presenter