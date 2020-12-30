import React from 'react'
import Image from 'next/image'

type PropsType = {
    width:string,
    height:string
}

export const Logo : React.FC<PropsType>= ({
    width,
    height    
}) => {
    return (
        <Image src={'/Logo.svg'} alt='Logo' width={width} height={height}/>
    )
}

export const HeaderLogo : React.FC<PropsType>= ({
    width,
    height    
}) => {
    return (
        <Image src={'/HeaderLogo.svg'} alt='HeaderLogo' width={width} height={height}/>
    )
}