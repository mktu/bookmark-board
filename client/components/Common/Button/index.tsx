import React from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'
import HeartButton from './HeartButton'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

type ColorType = 'dark' | 'light' | 'none' | 'secondary'
type SvgFillColorType = ColorType | 'dark-active' | 'secondary-active'
type FontType = 'bold' | 'none'

export const ContainedButton: React.FC<ButtonProps & {colorType?:ColorType}> = ({ className, disabled, colorType='dark', ...props }) => {
    const colorClasses : {[key in ColorType]:string}= {
        dark : `bg-primary-300 ${!disabled && 'hover:bg-primary-main'} text-white`,
        secondary : `bg-secondary-300 ${!disabled && 'hover:bg-secondary-main'} text-white`,
        light : `bg-white text-primary-main ${!disabled && 'hover:text-primary-dark'}`,
        none : ''
    }
    return (
        <ButtonBase disabled={disabled} className={classNames(`${colorClasses[colorType]} font-bold py-2 px-4 rounded`, className)} {...props} />
    )
}

export const OutlinedButton: React.FC<ButtonProps & {colorType?:ColorType}> = ({ className, colorType='dark', ...props }) => {
    const colorClasses : {[key in ColorType]:string}= {
        dark : 'text-primary-main hover:text-primary-dark border-primary-300 hover:border-primary-main',
        secondary : 'text-secondary-main hover:text-secondary-dark border-secondary-main hover:border-secondary-dark',
        light : 'bg-white text-primary-main hover:text-primary-dark',
        none : ''
    }
    return (
        <ButtonBase  className={classNames(`py-2 px-4 rounded border focus:outline-none`,  colorClasses[colorType], className)} {...props} />
    )
}

export const TextButton: React.FC<ButtonProps & {colorType?:ColorType, fontType?:FontType}> = ({ className, colorType='dark', fontType='bold', ...props }) => {
    const colorClasses : {[key in ColorType]:string}= {
        dark : 'text-primary-600 hover:text-primary-700',
        secondary : 'text-secondary-600 hover:text-secondary-700',
        light : 'text-white',
        none : ''
    }
    const fontTypes : {[key in FontType]:string}= {
        bold : 'font-bold',
        none : ''
    }
    return (
        <ButtonBase className={classNames(className,colorClasses[colorType], fontTypes[fontType], 'background-transparent uppercase')} {...props} />
    )
}

export const SvgIconButton: React.FC<ButtonProps & {colorType?:ColorType}> = ({ colorType='dark', className, ...props }) => {
    const colorClasses : {[key in ColorType]:string}= {
        dark : 'stroke-primary-main hover:stroke-primary-dark',
        secondary : 'stroke-secondary-main hover:stroke-secondary-600',
        light : 'stroke-white',
        none : ''
    }
    return (
        <ButtonBase className={classNames(className,colorClasses[colorType])} {...props} />
    )
}

export const SvgFillIconButton: React.FC<ButtonProps & {colorType?:SvgFillColorType}> = ({ colorType='dark', className, ...props }) => {
    const colorClasses : {[key in SvgFillColorType]:string}= {
        dark : 'fill-primary-300 hover:fill-primary-main',
        "dark-active" : 'fill-primary-main hover:fill-primary-300',
        secondary : 'fill-secondary-300 hover:fill-secondary-main',
        "secondary-active" : 'fill-secondary-main hover:fill-secondary-300',
        light : 'fill-white',
        none : ''
    }
    return (
        <ButtonBase className={classNames(className,colorClasses[colorType])} {...props} />
    )
}

export const SvgIconLink : React.FC<LinkProps> = (props)=>(
    <a className='text-current' {...props}/>
)

export const ButtonBase : React.FC<ButtonProps> = ({className, disabled, ...props})=> (
    <button disabled={disabled} className={classNames(styles['button-base'], className, disabled ? 'cursor-default opacity-25':'', 'focus:outline-none' )} {...props} /> 
)

export {
    HeartButton
}