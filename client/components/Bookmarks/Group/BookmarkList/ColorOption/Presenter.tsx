import React from 'react'

type Props = {
    colorList: React.ReactNode,
    input: React.ReactNode,
    submit: React.ReactNode,
    cancel: React.ReactNode,
    deleter?: React.ReactNode,
}

const Presenter: React.FC<Props> = ({
    colorList,
    input,
    submit,
    cancel,
    deleter
}) => {

    return (
        <div className='flex overflow-y-auto flex-col justify-start p-4 align-middle bg-white rounded'>
            <p className='text-sm text-primary-main'>色名や順序の設定をすることができます</p>
            <div>
                {colorList}
            </div>
            {deleter && (
                <>
                    <div className='flex overflow-hidden items-center mt-6 max-w-full'>
                        <h3 className='block text-sm font-semibold text-primary-main'>色を削除</h3>
                        <div className='flex-1 ml-2 w-full border-b border-primary-border' />
                    </div>
                    {deleter}
                </>
            )}
            <div className='flex overflow-hidden items-center mt-6 max-w-full'>
                <h3 className='block text-sm font-semibold text-primary-main'>色を新規追加</h3>
                <div className='flex-1 ml-2 w-full border-b border-primary-border' />
            </div>
            {input}
            <div className='flex justify-end mt-8'>
                <div className='mx-2'>
                    {cancel}
                </div>
                <div>
                    {submit}
                </div>
            </div>
        </div>
    )
}

export default Presenter