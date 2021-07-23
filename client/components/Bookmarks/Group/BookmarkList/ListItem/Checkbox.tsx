import React, { useState, useMemo } from 'react'
import { hex2rgb } from '@utils/rgb'
import { ButtonBase } from '@components/Common/Button'
import Check from '@components/Common/Icon/Check'
import classNames from 'classnames'
import { checkIsTouch } from '@utils/dnd'

type Props = {
    color?:string,
    checked?:boolean
} & Parameters<typeof ButtonBase>[0]

const Checkbox : React.VFC<Props> = ({onClick, color, checked, className})=>{
    const rgba = hex2rgb(color)
    const [hover,setHover] = useState(false)
    const isTouch = useMemo(()=>checkIsTouch(),[])

    const colorOpacity = !isTouch && hover ? 1.0 : 0.75
    const strokeOpacity = !isTouch && hover ? 1.0 : 0
    const defaultCheckedStyle = 'bg-primary-500 stroke-primary-50 border-white'
    const defaultStyle = `bg-white hover:border-primary-200 border-primary-border ${!isTouch && 'hover:stroke-primary-500'}`
    return (
        <ButtonBase aria-label='Check Bookmark'  onMouseOver={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}
            onClick={onClick}
            className={classNames(className, `${checked ? defaultCheckedStyle : defaultStyle } shadow border rounded-full`)} 
            style={color ? checked ? 
                    {backgroundColor : color} : 
                    {borderColor : `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${colorOpacity})`, borderWidth : 1, stroke : color, strokeOpacity : strokeOpacity} : 
                    {}}>
            <Check className='w-5 h-5 md:w-4 md:h-4' strokeWidth={2} fill='none'/>
        </ButtonBase>
    )
}

export default Checkbox