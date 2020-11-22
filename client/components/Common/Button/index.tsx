import React from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

export const ContainedButton: React.FC<ButtonProps> = ({ className, ...props }) => {
    return (
        <button className={classNames('bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded', className)} {...props} />
    )
}

export const OutlinedButton: React.FC<ButtonProps> = ({ className, ...props }) => {
    return (
        <button className={classNames('py-2 px-4 rounded border text-primary-main hover:text-primary-dark border-primary-main hover:border-primary-dark focus:outline-none', className)} {...props} />
    )
}

export const TextButton: React.FC<ButtonProps> = ({ className, ...props }) => {
    return (
        <ButtonBase className={classNames(className,'text-primary-600 hover:text-primary-700 background-transparent font-bold uppercase ')} {...props} />
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