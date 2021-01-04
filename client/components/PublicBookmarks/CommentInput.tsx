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
            <div className='relative flex border rounded items-center border-primary-border pl-2 pb-2'>
                <ResizableTextAreaBase aria-label='New Comment' minRows={4} className='placeholder-primary-200 text-primary-700 bg-white text-sm resize-none' value={input} onChange={(e)=>{
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