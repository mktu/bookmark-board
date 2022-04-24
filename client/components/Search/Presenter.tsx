import React from 'react'
//import Link from 'next/link'

type Props = {
    searchRefinements : React.ReactNode,
    bookmarkList : React.ReactNode,
    globalLink:string
}

const Presenter : React.FC<Props> = ({
    searchRefinements,
    bookmarkList,
}) => {
    return (
        <div className='flex flex-col p-4 w-full h-full'>
            {/* <div className='p-2 text-sm text-primary-main inline-flex items-center'>
                <span className='mr-1'>▶︎</span>
                <span>グローバル検索は</span>
                <Link href={globalLink}>
                    <a className='underline' href={globalLink}>こちら</a>
                </Link>
            </div> */}
            <div className='px-4 pt-4'>
                {searchRefinements}
            </div>
            <div className='overflow-y-auto flex-1 p-4'>
                {bookmarkList}
            </div>
        </div>
    )
}

export default Presenter