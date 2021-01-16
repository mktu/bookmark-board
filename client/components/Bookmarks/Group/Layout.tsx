import React from 'react'

type Props = {
    header: React.ReactNode,
    contents: React.ReactNode,
}
const Layout: React.FC<Props> = ({
    header,
    contents
}) => {
    return (
        <div className='flex flex-col w-full box-border h-full'>
            <div >{header}</div>
            <div className='flex-1 overflow-hidden'>{contents}</div>
        </div>
    )
}

export default Layout