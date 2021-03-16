import React from 'react'
import Link from 'next/link'

type Props = {
    searchRefinements : React.ReactNode,
    bookmarkList : React.ReactNode,
    globalLink:string
}

const Presenter : React.FC<Props> = ({
    searchRefinements,
    bookmarkList,
    globalLink
}) => {
    return (
        <div className='w-full h-full p-4 flex flex-col'>
            <div className='p-2 text-sm text-primary-main inline-flex items-center'>
                <span className='mr-1'>▶︎</span>
                <span>グローバル検索は</span>
                <Link href={globalLink}>
                    <a className='underline' href={globalLink}>こちら</a>
                </Link>
            </div>
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