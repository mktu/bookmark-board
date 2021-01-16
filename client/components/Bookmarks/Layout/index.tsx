import React from 'react'

type Props = {
    groups: React.ReactNode,
    group: React.ReactNode,
    showGroup ?: boolean
}

const Layout = ({
    groups,
    group,
    showGroup
}: Props) => {
    return (
        <div className='w-full h-full flex flex-row'>
            <div className={`h-full w-full ${showGroup && 'hidden'} md:w-3/12 md:block`}>{groups}</div>
            <div className={`h-full w-full ${!showGroup && 'hidden'} md:w-9/12 md:block`}>{group}</div>
        </div>
    )
}

export default Layout;