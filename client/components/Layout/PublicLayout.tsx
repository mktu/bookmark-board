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
        <div className='w-screen'>
            <div className='w-full'>{header}</div>
            <div>{main}</div>
            <div>{footer}</div>
        </div>
    )
}

export default Layout;