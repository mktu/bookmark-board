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
            <div className={`${alternative ? 'hidden' : 'flex'} md:flex flex-col w-full box-border h-full`}>
                <div >{header}</div>
                <div className='overflow-hidden flex-1'>{contents}</div>
            </div>
            <div>
                {alternativeContent}
            </div>
        </>
    )
}

export default Layout