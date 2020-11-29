import React from 'react'
import { ResizableTextAreaBase } from '../Common/Input'
import { ContainedButton } from '../Common/Button'

type Props = {

}

const CommentInput: React.FC<Props> = () => {
    return (
        <div >
            <div className='relative flex border rounded items-center border-primary-border pl-2 pb-2'>
                <ResizableTextAreaBase minRows={4} className='placeholder-primary-200 text-primary-700 bg-white text-sm resize-none' />
            </div>
            <div className='flex justify-end items-center'>
                <ContainedButton className='mt-4'>
                    コメントする
                </ContainedButton>
            </div>
        </div>
    )
}

export default CommentInput