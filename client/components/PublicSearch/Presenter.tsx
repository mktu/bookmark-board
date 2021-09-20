import React from 'react'
import { SearchByAlgolia } from '@components/Common/Image'

type Props = {
    searchBox: React.ReactNode,
    hits: React.ReactNode
}

const Presenter: React.FC<Props> = ({
    searchBox,
    hits
}) => {
    return (
        <div className='flex justify-center w-full'>
            <div className='p-8 w-full md:w-4/5'>
                <div className='mb-4'>
                    {searchBox}
                </div>
                {hits}
                <div className='flex justify-end items-center mt-4'>
                    <SearchByAlgolia width={168} height={24} />
                </div>
            </div>
        </div>
    )
}

export default Presenter