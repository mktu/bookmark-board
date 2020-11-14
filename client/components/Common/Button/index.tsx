import React from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

type ContainedButtonProps = ButtonProps & {
    variant?: 'primary' | 'secondary' | 'inherit'
}

export const ContainedButton: React.FC<ButtonProps> = ({ className, ...props }) => {
    return (
        <button className={classNames('bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded', className)} {...props} />
    )
}

type TextButtonProps = ContainedButtonProps

export const TextButton: React.FC<TextButtonProps> = ({ variant = 'primary', className, ...props }) => {
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
    children: React.ReactNode,
    variant?: 'outlined' | 'contained' | 'inherit'
}

export const SvgIconButton: React.FC<IconButtonProps> = ({ variant = 'outlined', className, children, ...props }) => {
    if (variant === 'inherit') {
        return (
            <button className={classNames(styles['svg-inherit-button'], className)} {...props}>
                {children}
            </button>
        )
    }
    return (
        <button className={classNames(styles['svg-outlined-button'], className)} {...props}>
            {children}
        </button>
    )
}

export const SvgIconLink : React.FC<LinkProps> = (props)=>(
    <a className='text-current' {...props}/>
)

export const ButtonBase : React.FC<ButtonProps> = ({className, ...props})=> (
    <button className={classNames(styles['button-base'], className, 'focus:outline-none')} {...props} /> 
)