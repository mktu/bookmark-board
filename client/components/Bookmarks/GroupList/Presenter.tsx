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
        <div className='flex flex-col w-full h-full bg-white border-r border-primary-border'>
            <div className={classNames('border-primary-border flex flex-row justify-between p-1 items-center text-primary-main')}>
                <div className='p-2 w-full'>
                    {input}
                </div>
                <div>
                    {addButton}
                </div>
            </div>
            {error && (
                <div className='py-2 px-4 text-xs text-secondary-main'>{error}</div>
            )}
            <div className='overflow-y-auto h-full'>
                {groupList}
            </div>
        </div>
    )
}

export default Presenter