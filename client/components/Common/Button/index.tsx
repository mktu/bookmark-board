import React from 'react'
import classNames from 'classnames'

type ContainedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant ?: 'primary' | 'secondary' | 'inherit'
}

export const ContainedButton : React.FC<ContainedButtonProps> = ({variant = 'primary', className, ...props}) => {
    return (
        <button className={classNames('bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded',className)} {...props}/>
    )
}

type LinkButtonProps = ContainedButtonProps

export const LinkButton : React.FC<LinkButtonProps> = ({variant = 'primary', className, ...props}) => {
    if(variant==='inherit'){
        return (
            <button className={classNames('background-transparent font-bold uppercase outline-none focus:outline-none mr-1 mb-1', className)} {...props}/>
        )
    }
    return (
        <button className={classNames('text-primary-600 hover:text-primary-700 background-transparent font-bold uppercase outline-none focus:outline-none mr-1 mb-1', className)} {...props}/>
    )
}
