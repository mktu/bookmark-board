import React from 'react'
import classNames from 'classnames'
import HeartButton from './HeartButton'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

type ColorType = 'dark' | 'light' | 'none' | 'secondary'
type SvgFillColorType = ColorType | 'dark-active' | 'secondary-active'
type FontType = 'bold' | 'none'

export const ContainedButton: React.FC<ButtonProps & {colorType?:ColorType}> = ({ className, disabled, colorType='dark', ...props }) => {
    const colorClasses : {[key in ColorType]:string}= {
        dark : `bg-primary-main ${!disabled && 'hover:bg-primary-dark'} text-white`,
        secondary : `bg-secondary-main ${!disabled && 'hover:bg-secondary-dark'} text-white`,
        light : `bg-white text-primary-main ${!disabled && 'hover:text-primary-dark'}`,
        none : ''
    }
    return (
        <ButtonBase disabled={disabled} className={classNames(`${colorClasses[colorType]} font-bold py-2 px-4 rounded`, className)} {...props} />
    )
}

export const OutlinedButton: React.FC<ButtonProps & {colorType?:ColorType}> = ({ className, disabled, colorType='dark', ...props }) => {
    const colorClasses : {[key in ColorType]:string}= {
        dark : `text-primary-main border-primary-300 ${!disabled && 'hover:text-primary-dark hover:border-primary-main'}`,
        secondary : `text-secondary-main border-secondary-main ${!disabled && 'hover:text-secondary-dark hover:border-secondary-dark'}`,
        light : `bg-white text-primary-main ${!disabled && 'hover:text-primary-dark'}`,
        none : ''
    }
    return (
        <ButtonBase disabled={disabled}  className={classNames(`py-2 px-4 rounded border focus:outline-none`,  colorClasses[colorType], className)} {...props} />
    )
}

export const TextButton: React.FC<ButtonProps & {colorType?:ColorType, fontType?:FontType}> = ({ className,disabled, colorType='dark', fontType='bold', ...props }) => {
    const colorClasses : {[key in ColorType]:string}= {
        dark : `text-primary-600 ${!disabled&&'hover:text-primary-700'}`,
        secondary : `text-secondary-600 ${!disabled&&'hover:text-secondary-700'}`,
        light : 'text-white',
        none : ''
    }
    const fontTypes : {[key in FontType]:string}= {
        bold : 'font-bold',
        none : ''
    }
    return (
        <ButtonBase disabled={disabled} className={classNames(className,colorClasses[colorType], fontTypes[fontType], 'background-transparent uppercase')} {...props} />
    )
}

export const SvgIconButton: React.FC<ButtonProps & {colorType?:ColorType}> = ({ colorType='dark', className, disabled, ...props }) => {
    const colorClasses : {[key in ColorType]:string}= {
        dark : `stroke-primary-main ${!disabled && 'hover:stroke-primary-dark'}`,
        secondary : `stroke-secondary-main ${!disabled && 'hover:stroke-secondary-600'}`,
        light : 'stroke-white',
        none : ''
    }
    return (
        <ButtonBase disabled={disabled} className={classNames(className,colorClasses[colorType])} {...props} />
    )
}

export const SvgFillIconButton: React.FC<ButtonProps & {colorType?:SvgFillColorType}> = ({ colorType='dark', className, disabled, ...props }) => {
    const colorClasses : {[key in SvgFillColorType]:string}= {
        dark : `fill-primary-300 ${!disabled && 'hover:fill-primary-main'}`,
        "dark-active" : `fill-primary-main ${!disabled && 'hover:fill-primary-300'}`,
        secondary : `fill-secondary-300 ${!disabled && 'hover:fill-secondary-main'}`,
        "secondary-active" : `fill-secondary-main ${!disabled && 'hover:fill-secondary-300'}`,
        light : 'fill-white',
        none : ''
    }
    return (
        <ButtonBase disabled={disabled} className={classNames(className,colorClasses[colorType])} {...props} />
    )
}
    
export const ButtonBase : React.FC<ButtonProps> = ({className, disabled, ...props})=> (
    <button disabled={disabled} className={classNames(className, disabled ? 'cursor-default opacity-25':'')} {...props} /> 
)

export {
    HeartButton
}