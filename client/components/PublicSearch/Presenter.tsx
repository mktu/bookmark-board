import React from 'react'

type Props = {
    searchBox: React.ReactNode,
    hits: React.ReactNode
}

const Presenter: React.FC<Props> = ({
    searchBox,
    hits
}) => {
    return (
        <div className='w-full flex justify-center'>
            <div className='p-8 w-full md:w-4/5'>
                <div className='mb-4'>
                    {searchBox}
                </div>
                {hits}
            </div>
        </div>
    )
}

export default Presenter