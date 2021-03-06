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
            <header className='w-full'>{header}</header>
            <main className='flex-1'>{main}</main>
            <footer>{footer}</footer>
        </div>
    )
}

export default Layout;