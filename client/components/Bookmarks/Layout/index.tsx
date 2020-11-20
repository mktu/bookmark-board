import React from 'react'

type Props = {
    groups: React.ReactNode,
    group: React.ReactNode,
}

const Layout = ({
    groups,
    group,
}: Props) => {
    return (
        <div className='w-full h-full flex flex-row'>
            <div className='h-full w-3/12'>{groups}</div>
            <div className='h-full w-9/12'>{group}</div>
        </div>
    )
}

export default Layout;