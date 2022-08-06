import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

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
        <article className='flex w-screen flex-col overflow-hidden py-12'>
            {top}
            {topics}
            {publish}
            {plugin}
            {siginin}
        </article>
    )
}

export default Page;