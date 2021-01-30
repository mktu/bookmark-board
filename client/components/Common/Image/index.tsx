import React from 'react'
import Image from 'next/image'

const BookmarksSigninImg : React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({width,height})=>{
    return <Image src={'/BookmarksSignin.svg'} alt='BookmarksSignin' width={width} height={height}/>;
}

const GoogleSignInImg : React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({...props})=>{
    return <img src={'/GoogleSignin.svg'} alt='BookmarksSignin' {...props}/>;
}

const NoItemImg : React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({...props})=>{
    return <img src={'/NoItem.svg'} alt='NoItem' {...props}/>;
}

const LoadingImg : React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({...props})=>{
    return <img src={'/Loading.svg'} alt='Loading...' {...props}/>;
}

const PlaceHolderImg : React.FC<{width?:string,height?:string}> = ({width,height})=>{
    return <Image src={'/Placeholder.svg'} alt='PlaceholderImage' width={width} height={height}/>;
}

const WelcomeImg : React.FC<{width?:string,height?:string}> = ({width,height})=>{
    return <Image src={'/Welcoming.svg'} alt='Welcoming' width={width} height={height}/>;
}

const SigninImg : React.FC<{width?:string,height?:string}> = ({width,height})=>{
    return <Image src={'/StepToTheSun.svg'} alt='StepToTheSun' width={width} height={height}/>;
}

const BookmarksMainImg : React.FC<{width?:string,height?:string}> = ({width,height})=>{
    return <Image src={'/Bookmark.svg'} alt='Bookmark' width={width} height={height}/>;
}

const TwitterImage : React.FC<{width?:string,height?:string, variant?:'circle'|'logo'}> = ({width,height,variant='circle'})=>{
    return <Image src={variant === 'circle' ? '/Twitter_Social_Icon_Circle_Color.svg' : '/Twitter_Logo_Blue.svg'} alt='Twitter' width={width} height={height}/>;
}

const LpBubble : React.FC<{width?:string,height?:string, variant?:'circle'|'logo'}> = ({width,height})=>{
    return <Image src={'/LpBubble.svg'} alt='Bubble' width={width} height={height}/>;
}

const LpApp : React.FC<{width?:string,height?:string}> = ({width,height})=>{
    return <Image src={'/App.png'} alt='App' width={width} height={height}/>;
}

const LpPubApp : React.FC<{width?:string,height?:string}> = ({width,height})=>{
    return <Image src={'/PublicApp.png'} alt='PublicApp' width={width} height={height}/>;
}

const LpGroup : React.FC<{width?:string,height?:string}> = ({width,height})=>{
    return <Image layout='fill' objectFit='contain'src={'/LpGroup.png'} alt='LpGroup' objectPosition='left top'/>;
}

const LpComment : React.FC<{width?:number,height?:number}> = ({width,height})=>{
    return <Image layout='fill' objectFit='contain' src={'/LpComment.png'} alt='LpComment' objectPosition='left top'/>;
}

const LpShare : React.FC<{width?:number,height?:number}> = ({width,height})=>{
    return <Image layout='fill' objectFit='contain' src={'/LpShare.png'} alt='LpShare' objectPosition='left top' />;
}


export {
    BookmarksMainImg,
    BookmarksSigninImg,
    GoogleSignInImg,
    NoItemImg,
    LoadingImg,
    PlaceHolderImg,
    WelcomeImg,
    SigninImg,
    TwitterImage,
    LpBubble,
    LpApp,
    LpPubApp,
    LpGroup,
    LpComment,
    LpShare
}