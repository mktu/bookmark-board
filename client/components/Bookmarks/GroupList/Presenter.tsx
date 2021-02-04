import React from 'react'

type Props = {
    input: React.ReactNode,
    addButton: React.ReactNode,
    groupList: React.ReactNode,
}

const Presenter: React.FC<Props> = ({
    input,
    addButton,
    groupList
}) => {
    return (
        <div className='bg-white w-full h-full flex flex-col border-primary-border border-r'>
            <div className='border-primary-border flex flex-row justify-between p-1 items-center text-primary-main'>
                <div className='p-2 w-full'>
                    {input}
                </div>
                <div>
                    {addButton}
                </div>
            </div>
            <div className='overflow-scroll h-full'>
                {groupList}
            </div>
        </div>
    )
}

export default Presenter