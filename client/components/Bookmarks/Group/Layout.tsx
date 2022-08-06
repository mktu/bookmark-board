import React from 'react'

type Props = {
    header: React.ReactNode,
    contents: React.ReactNode,
    alternative?: boolean,
    alternativeContent?: React.ReactNode,
}
const Layout: React.FC<Props> = ({
    header,
    contents,
    alternative,
    alternativeContent
}) => {
    return (
        <>
            <div className={`${alternative ? 'hidden' : 'flex'} box-border h-full w-full flex-col md:flex`}>
                <div >{header}</div>
                <div className='flex-1 overflow-hidden'>{contents}</div>
            </div>
            <div>
                {alternativeContent}
            </div>
        </>
    )
}

export default Layout