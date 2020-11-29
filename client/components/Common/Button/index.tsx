import React from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

type ColorType = 'dark' | 'light' | 'none'

export const ContainedButton: React.FC<ButtonProps & {colorType?:ColorType}> = ({ className, colorType='dark', ...props }) => {
    const colorClasses : {[key in ColorType]:string}= {
        dark : 'bg-primary-300 hover:bg-primary-main text-white',
        light : 'bg-white text-primary-main hover:text-primary-dark',
        none : ''
    }
    return (
        <ButtonBase className={classNames(`${colorClasses[colorType]} font-bold py-2 px-4 rounded`, className)} {...props} />
    )
}

export const OutlinedButton: React.FC<ButtonProps> = ({ className, ...props }) => {
    return (
        <button className={classNames(`py-2 px-4 rounded border text-primary-main hover:text-primary-dark border-primary-main hover:border-primary-dark focus:outline-none`, className)} {...props} />
    )
}

export const TextButton: React.FC<ButtonProps & {colorType?:ColorType}> = ({ className, colorType='dark', ...props }) => {
    const colorClasses : {[key in ColorType]:string}= {
        dark : 'text-primary-600 hover:text-primary-700',
        light : 'text-white',
        none : ''
    }
    return (
        <ButtonBase className={classNames(className,colorClasses[colorType],'background-transparent font-bold uppercase')} {...props} />
    )
}

export const SvgIconButton: React.FC<ButtonProps & {colorType?:ColorType}> = ({ colorType='dark', className, ...props }) => {
    const colorClasses : {[key in ColorType]:string}= {
        dark : 'stroke-primary-main hover:stroke-primary-dark',
        light : 'stroke-white',
        none : ''
    }
    return (
        <ButtonBase className={classNames(className,colorClasses[colorType])} {...props} />
    )
}

export const SvgIconLink : React.FC<LinkProps> = (props)=>(
    <a className='text-current' {...props}/>
)

export const ButtonBase : React.FC<ButtonProps> = ({className, ...props})=> (
    <button className={classNames(styles['button-base'], className, 'focus:outline-none')} {...props} /> 
)