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
        <div className='relative flex h-full w-full flex-col items-center overflow-hidden bg-primary-light'>
            <div className='flex h-full w-full flex-1 flex-col items-center overflow-hidden' >
                <div className='w-full'>
                    {refinements}
                </div>
                <div className='w-full flex-1 overflow-y-auto px-2'>
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
            <div className='fixed bottom-0 z-20 w-full md:relative md:mt-auto md:pt-1' ref={(r) => {
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