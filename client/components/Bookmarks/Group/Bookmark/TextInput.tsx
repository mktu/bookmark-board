import React, { useState, useEffect } from 'react'
import { TextInput } from '../../../Common/Input'

type Props = Parameters<typeof TextInput>[0] & {
    handleSubmit: (value: string) => void,
}


const BookmarkTextInput: React.FC<Props> = ({
    value,
    handleSubmit,
    ...props
}) => {
    const [text, setText] = useState(value)
    useEffect(() => {
        setText(value)
    }, [value])
    return (
        <TextInput {...props} value={text} onChange={(e) => {
            setText(e.target.value)
        }} onBlur={() => {
            if (text !== value) {
                handleSubmit('' + text)
            }
        }} />
    )
}

export default BookmarkTextInput