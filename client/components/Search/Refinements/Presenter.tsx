import React from 'react'

type Props = {
    input: React.ReactNode
    groupCheckbox: React.ReactNode
}

const Presenter: React.FC<Props> = ({
    input,
    groupCheckbox
}) => {
    return (
        <div>
            {input}
            <div className='mt-2 flex items-center justify-end'>
                {groupCheckbox}
            </div>
        </div>
    )
}

export default Presenter