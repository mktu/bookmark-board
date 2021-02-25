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
        <div className='bg-white p-4 rounded flex flex-col justify-start align-middle overflow-y-auto'>
            <p className='text-sm text-primary-main'>色名や順序の設定をすることができます</p>
            <div>
                {colorList}
            </div>
            {deleter && (
                <>
                    <div className='flex items-center max-w-full overflow-hidden mt-6'>
                        <h3 className='text-primary-main text-sm font-semibold  block'>色を削除</h3>
                        <div className='ml-2 border-b border-primary-border w-full flex-1' />
                    </div>
                    {deleter}
                </>
            )}
            <div className='flex items-center max-w-full overflow-hidden mt-6'>
                <h3 className='text-primary-main text-sm font-semibold  block'>色を新規追加</h3>
                <div className='ml-2 border-b border-primary-border w-full flex-1' />
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