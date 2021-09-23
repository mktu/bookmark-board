import React from 'react'

type Props = {
    top : React.ReactNode,
    publish : React.ReactNode,
    topics : React.ReactNode,
    plugin : React.ReactNode,
    siginin : React.ReactNode,
}

const Page : React.FC<Props> = ({
    top,
    publish,
    topics,
    plugin,
    siginin
}) => {
    return (
        <article className='flex overflow-hidden flex-col py-12 w-screen'>
            {top}
            {topics}
            {publish}
            {plugin}
            {siginin}
        </article>
    )
}

export default Page;