import React from 'react'
import classNames from 'classnames'
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

const ResizableTextAreaBase: React.FC<TextareaAutosizeProps> = ({
    className,
    disabled,
    ...props
}) => {
    return (
        <TextareaAutosize disabled={disabled} {...props} className={classNames(className,'relative outline-none focus:outline-none w-full',disabled ? 'cursor-default opacity-25':'')} />
    )
}

export default ResizableTextAreaBase