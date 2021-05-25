import React from 'react'
import Image from 'next/image'

type ImageProps = Omit<Parameters<typeof Image>[0], 'alt' | 'src'>

const LpBubble: React.FC<{ width?: string, height?: string, variant?: 'circle' | 'logo' }> = ({ width, height }) => {
    return <Image src={'/LpBubble.svg'} alt='Bubble' width={width} height={height} />;
}

const LpApp: React.FC<ImageProps> = ({ width, height, ...others }) => {
    return <Image src={'/App.png'} alt='App' width={width} height={height} {...others} />;
}
const LpPubApp: React.FC<ImageProps> = ({ width, height }) => {
    return <Image src={'/PublicApp.png'} alt='PublicApp' width={width} height={height} />;
}

const LpGroup: React.FC<ImageProps> = () => {
    return <Image layout='fill' objectFit='contain' src={'/LpGroup.png'} alt='LpGroup' objectPosition='left top' />;
}

const LpComment: React.FC<ImageProps> = () => {
    return <Image layout='fill' objectFit='contain' src={'/LpComment.png'} alt='LpComment' objectPosition='left top' />;
}

const LpShare: React.FC<ImageProps> = () => {
    return <Image layout='fill' objectFit='contain' src={'/LpShare.png'} alt='LpShare' objectPosition='left top' />;
}

const LpStart: React.FC<ImageProps> = ({width, height, ...others}) => {
    return <Image src={'/undraw_Balloons_re_8ymj.svg'} alt='LpStart' width={width} height={height} {...others} />;
}

const LpPlugin: React.FC<ImageProps> = ({width, height, ...others}) => {
    return <Image src={'/Plugin.png'} alt='Plugin' width={width} height={height} {...others}/>
}

export {
    LpBubble,
    LpApp,
    LpPubApp,
    LpGroup,
    LpComment,
    LpShare,
    LpStart,
    LpPlugin
}