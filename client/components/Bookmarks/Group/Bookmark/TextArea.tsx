import React, {useState,useEffect} from 'react'
import { ResizableTextArea } from '../../../Common/Input'


type Props = Parameters<typeof ResizableTextArea>[0] & {
    handleSubmit : (value:string)=>void,
}


const BookmarkTextInput : React.FC<Props> = ({
    value,
    handleSubmit,
    ...props
})=>{
    const [text,setText] = useState(value)
    useEffect(()=>{
        setText(value)
    },[value])
    return (
        <ResizableTextArea {...props} value={text} onChange={(e)=>{
            setText(e.target.value)
        }} onBlur={()=>{
            if(text !== value){
                handleSubmit(''+text)
            }
        }}/>
    )
}

export default BookmarkTextInput