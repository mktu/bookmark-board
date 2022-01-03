import React, { useState, useEffect } from 'react'
import { checkIsTouch } from '@utils/dnd'

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
    const [footerHeight, setFooter] = useState<number>()
    useEffect(() => {
        window && checkIsTouch() && window.scrollTo({
            top: 0,
        });
    }, [])
    return (
        <div className='flex overflow-hidden relative flex-col items-center w-full h-full bg-primary-light'>
            <div className='flex overflow-hidden flex-col flex-1 items-center w-full h-full' >
                <div className='w-full'>
                    {refinements}
                </div>
                <div className='overflow-y-auto flex-1 px-2 w-full'>
                    {bookmarkIds.map((id, idx) => (
                        <div key={id}>
                            {renderBookmark(id, idx)}
                        </div>
                    ))}
                </div>
            </div>
            <div className='md:hidden' style={{
                height: footerHeight ? footerHeight : undefined
            }} />
            <div className='fixed bottom-0 z-20 w-full md:relative md:pt-1 md:mt-auto' ref={(r) => {
                if (r) {
                    // set height only once because input height may change when url image shows
                    setFooter(b => !b ? r.clientHeight : b)
                }
            }}>
                {input}
            </div>
        </div>
    )
}

export default Layout