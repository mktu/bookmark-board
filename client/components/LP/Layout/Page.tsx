import React from 'react'

type Props = {
    top : React.ReactNode,
    publish : React.ReactNode,
    topics : React.ReactNode,
    siginin : React.ReactNode,
}

const Page : React.FC<Props> = ({
    top,
    publish,
    topics,
    siginin
}) => {
    return (
        <article className='w-screen flex flex-col py-12' style={{
            backgroundImage: `url('/untitled.svg')`,
            backgroundRepeat: 'repeat',
        }}>
            {top}
            {topics}
            {publish}
            {siginin}
        </article>
    )
}

export default Page;