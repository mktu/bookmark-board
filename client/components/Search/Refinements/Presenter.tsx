import React from 'react'

type Props = {
    input: React.ReactNode
}

const Presenter: React.FC<Props> = ({
    input
}) => {
    return (
        <div>
            {input}
        </div>
    )
}

export default Presenter