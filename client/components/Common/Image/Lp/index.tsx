import React from 'react'
import Image from 'next/image'


const LpBubble : React.FC<{width?:string,height?:string, variant?:'circle'|'logo'}> = ({width,height})=>{
    return <Image src={'/LpBubble.svg'} alt='Bubble' width={width} height={height}/>;
}

const LpApp : React.FC<{width?:number,height?:number}> = ({width,height})=>{
    return <Image src={'/App.png'} alt='App' width={width} height={height}/>;
}
const LpPubApp : React.FC<{width?:number,height?:number}> = ({width,height})=>{
    return <Image src={'/PublicApp.png'} alt='PublicApp' width={width} height={height}/>;
}

const LpGroup : React.FC<{width?:number,height?:number}> = ()=>{
    return <Image layout='fill' objectFit='contain'src={'/LpGroup.png'} alt='LpGroup' objectPosition='left top'/>;
}

const LpComment : React.FC<{width?:number,height?:number}> = ()=>{
    return <Image layout='fill' objectFit='contain' src={'/LpComment.png'} alt='LpComment' objectPosition='left top'/>;
}

const LpShare : React.FC<{width?:number,height?:number}> = ()=>{
    return <Image layout='fill' objectFit='contain' src={'/LpShare.png'} alt='LpShare' objectPosition='left top' />;
}


export {
    LpBubble,
    LpApp,
    LpPubApp,
    LpGroup,
    LpComment,
    LpShare
}