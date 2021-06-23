import React, { useState } from 'react'

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
    return (
        <div className='flex flex-col items-center bg-primary-light h-full w-full relative overflow-hidden'>
            <div className='flex flex-col items-center h-full w-full flex-1 overflow-hidden' >
                <div className='w-full'>
                    {refinements}
                </div>
                <div className='overflow-y-auto w-full px-2 flex-1'>
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
            <div className='w-full fixed bottom-0 md:relative md:mt-auto md:pt-1 z-20' ref={(r) => {
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