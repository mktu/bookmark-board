import React from 'react'
import TextareaAutosize, {TextareaAutosizeProps} from 'react-textarea-autosize';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const InputWithIcon: React.FC<InputProps & {
    icon?: React.ReactNode,
}> = ({
    icon,
    ...props
}) => {
        return (
            <div className="relative flex w-full flex-wrap items-stretch mb-3">
                <span className="z-10 h-full leading-snug font-normal text-center text-primary-700 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    {icon}
                </span>
                <input {...props} type="text" className="px-3 py-3 placeholder-primary-200 text-primary-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10" />
            </div>
        )
    }

export const TextInput: React.FC<InputProps> = ({
    ...props
}) => {
    return (
        <div className="relative flex w-full flex-wrap items-stretch border-b">
            <input {...props} type="text" className="px-3 py-3 placeholder-primary-200 text-primary-700 relative bg-white text-sm outline-none focus:outline-none w-full" />
        </div>
    )
}

export const ResizableTextArea: React.FC<TextareaAutosizeProps> = ({
    ...props
}) => {
    return (
        <div className="relative flex w-full flex-wrap items-stretch border-b border-primary-border p-2">
            <TextareaAutosize {...props}  className=" placeholder-primary-200 text-primary-700 relative bg-white text-sm outline-none focus:outline-none w-full" />
        </div>
    )
}

export const BookmarkInput: React.FC<InputProps> = ({
    ...props
}) => {
    return (
        <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <input {...props} type="text" className="px-3 py-3 placeholder-primary-200 text-primary-700 relative bg-white rounded text-sm outline-none focus:outline-none shadow focus:shadow-outline w-full" />
        </div>
    )
}

export const BookmarkInputBase: React.FC<InputProps> = ({
    ...props
}) => {
    return (
        <input {...props} type="text" className="px-3 py-3 bg-transparent placeholder-primary-200 text-primary-700 relative text-sm outline-none focus:outline-none w-full" />
    )
}
