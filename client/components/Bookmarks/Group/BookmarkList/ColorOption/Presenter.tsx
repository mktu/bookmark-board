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
        <div className='flex flex-col justify-start overflow-y-auto rounded bg-white p-4 align-middle'>
            <p className='text-sm text-primary-main'>色名や順序の設定をすることができます</p>
            <div>
                {colorList}
            </div>
            {deleter && (
                <>
                    <div className='mt-6 flex max-w-full items-center overflow-hidden'>
                        <h3 className='block text-sm font-semibold text-primary-main'>色を削除</h3>
                        <div className='ml-2 w-full flex-1 border-b border-primary-border' />
                    </div>
                    {deleter}
                </>
            )}
            <div className='mt-6 flex max-w-full items-center overflow-hidden'>
                <h3 className='block text-sm font-semibold text-primary-main'>色を新規追加</h3>
                <div className='ml-2 w-full flex-1 border-b border-primary-border' />
            </div>
            {input}
            <div className='mt-8 flex justify-end'>
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