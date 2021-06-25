import React from 'react'
import classNames from 'classnames'

type Props = {
    input: React.ReactNode,
    addButton: React.ReactNode,
    groupList: React.ReactNode,
    error?: string
}

const Presenter: React.FC<Props> = ({
    input,
    addButton,
    groupList,
    error
}) => {
    return (
        <div className='bg-white w-full h-full flex flex-col border-primary-border border-r'>
            <div className={classNames('border-primary-border flex flex-row justify-between p-1 items-center text-primary-main')}>
                <div className='p-2 w-full'>
                    {input}
                </div>
                <div>
                    {addButton}
                </div>
            </div>
            {error && (
                <div className='text-secondary-main text-xs px-4 py-2'>{error}</div>
            )}
            <div className='overflow-y-auto h-full'>
                {groupList}
            </div>
        </div>
    )
}

export default Presenter