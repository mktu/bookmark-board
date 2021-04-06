import React from 'react'
type Props = {
    header: React.ReactNode,
    main: React.ReactNode,
    footer?: React.ReactNode,
    fixedHeader?: boolean
}

const Layout = ({
    header,
    main,
    footer,
    fixedHeader
}: Props) => {
    return (
        <div className='w-screen min-h-screen flex flex-col'>
            <header
                className={`w-full ${fixedHeader ? 'shadow-xl fixed z-50' : ''}`}
                style={fixedHeader && { opacity: 0.98 }}
            >
                {header}
            </header>
            <main
                className='flex-1'
                style={fixedHeader && { marginTop: 60 }}
            >
                {main}
            </main>
            <footer>{footer}</footer>
        </div>
    )
}

export default Layout;