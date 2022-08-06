import React, { useContext, useState } from 'react'
import ResizableTextAreaBase from '../Common/Input/ResizableTextAreaBase'
import { ContainedButton } from '../Common/Button'
import FirebaseContext from '../../context/FirebaseContext'


type Props = {
    groupId: string,
    className?: string
}

const CommentInput: React.FC<Props> = ({
    groupId,
    className
}) => {
    const { clientService } = useContext(FirebaseContext)
    const [input, setInput] = useState('')
    return (
        <div className={className}>
            <h2 className='mb-2 text-primary-main'>コメントする</h2>
            <div className='relative flex items-center rounded border border-primary-border pb-2 pl-2'>
                <ResizableTextAreaBase aria-label='New Comment' minRows={4} className='resize-none bg-white text-sm text-primary-700 placeholder:text-primary-200' value={input} onChange={(e) => {
                    setInput(e.target.value)
                }} />
            </div>
            <div className='flex items-center justify-end'>
                <ContainedButton disabled={!input} className='mt-4' onClick={() => {
                    if (!input) {
                        return
                    }
                    clientService.addComment(
                        {
                            comment: input,
                            groupId
                        }, () => {
                            setInput('')
                        }
                    )
                }}>
                    コメントする
                </ContainedButton>
            </div>
        </div>
    )
}

export default CommentInput