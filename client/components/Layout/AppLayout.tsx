import React from 'react'

type Props = {
    header: React.ReactNode,
    sidebar: React.ReactNode,
    main: React.ReactNode
}

const Layout = ({
    header,
    sidebar,
    main
}: Props) => {
    return (
        <div className='w-screen h-screen flex flex-col'>
            <div>
                {header}
            </div>
            <div className='h-full w-full flex flex-row'>
                <div className='h-full'>{sidebar}</div>
                <div className='h-full w-full'>{main}</div>
            </div>

        </div>
    )
}

export default Layout;