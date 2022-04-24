import React from 'react'

type Props = {
    input: React.ReactNode
    groupCheckbox : React.ReactNode
}

const Presenter: React.FC<Props> = ({
    input,
    groupCheckbox
}) => {
    return (
        <div>
            {input}
            <div className='flex justify-end items-center mt-2'>
                {groupCheckbox}
            </div>
        </div>
    )
}

export default Presenter