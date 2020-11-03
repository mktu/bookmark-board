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
        <div className='w-full h-full'>
            <div className='w-full'>{header}</div>
            <div className='w-full h-full'>{contents}</div>
        </div>
    )
}

export default Layout