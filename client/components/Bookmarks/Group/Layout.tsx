import React from 'react'

type Props = {
    header: React.ReactNode,
    contents: React.ReactNode,
    showDetail?: boolean,
    bookmarkDetail?: React.ReactNode,
}
const Layout: React.FC<Props> = ({
    header,
    contents,
    bookmarkDetail,
    showDetail
}) => {
    return (
        <>
            <div className={`${showDetail ? 'hidden' : 'flex'} md:flex flex-col w-full box-border h-full`}>
                <div >{header}</div>
                <div className='flex-1 overflow-hidden'>{contents}</div>
            </div>
            <div>
                {bookmarkDetail}
            </div>
        </>
    )
}

export default Layout