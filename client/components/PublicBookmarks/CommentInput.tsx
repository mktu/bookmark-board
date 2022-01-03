import React, {useContext,useState} from 'react'
import ResizableTextAreaBase from '../Common/Input/ResizableTextAreaBase'
import { ContainedButton } from '../Common/Button'
import FirebaseContext from '../../context/FirebaseContext'


type Props = {
    groupId:string,
    className?:string
}

const CommentInput: React.FC<Props> = ({
    groupId,
    className
}) => {
    const {clientService} = useContext(FirebaseContext)
    const [input,setInput] = useState('')
    return (
        <div className={className}>
            <h2 className='mb-2 text-primary-main'>コメントする</h2>
            <div className='flex relative items-center pb-2 pl-2 rounded border border-primary-border'>
                <ResizableTextAreaBase aria-label='New Comment' minRows={4} className='text-sm placeholder:text-primary-200 text-primary-700 bg-white resize-none' value={input} onChange={(e)=>{
                    setInput(e.target.value)
                }}/>
            </div>
            <div className='flex justify-end items-center'>
                <ContainedButton disabled={!input} className='mt-4' onClick={()=>{
                    if(!input){
                        return
                    }
                    clientService.addComment(
                        {
                            comment : input,
                            groupId
                        },()=>{
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