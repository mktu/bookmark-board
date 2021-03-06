import React from 'react'
type Props = {
    header: React.ReactNode,
    main: React.ReactNode,
    footer?: React.ReactNode,

}

const Layout = ({
    header,
    main,
    footer
}: Props) => {
    return (
        <div className='w-screen min-h-screen flex flex-col'>
            <div className='w-full'>{header}</div>
            <div className='flex-1'>{main}</div>
            <div>{footer}</div>
        </div>
    )
}

export default Layout;