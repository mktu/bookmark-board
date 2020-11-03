import React from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'

type ContainedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'inherit'
}

export const ContainedButton: React.FC<ContainedButtonProps> = ({ variant = 'primary', className, ...props }) => {
    return (
        <button className={classNames('bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded', className)} {...props} />
    )
}

type LinkButtonProps = ContainedButtonProps

export const LinkButton: React.FC<LinkButtonProps> = ({ variant = 'primary', className, ...props }) => {
    if (variant === 'inherit') {
        return (
            <button className={classNames('background-transparent font-bold uppercase outline-none focus:outline-none mr-1 mb-1', className)} {...props} />
        )
    }
    return (
        <button className={classNames('text-primary-600 hover:text-primary-700 background-transparent font-bold uppercase outline-none focus:outline-none mr-1 mb-1', className)} {...props} />
    )
}

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children : React.ReactNode,
    variant?: 'outlined' | 'contained' 
}

export const SvgIconButton: React.FC<IconButtonProps> = ({ variant = 'outlined', className, children, ...props }) => {
    return (
        <button className={classNames(styles['svg-outlined-button'], className)} {...props}>
            {children}
        </button>
    )
}