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

const PlaceHolderImg : React.FC<{width?:number,height?:number}> = ({width,height})=>{
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

const SearchByAlgolia : React.FC<{width?:number,height?:number}> = ({width,height})=>{
    return <Image src={'/search-by-algolia-light-background.svg'} alt='Search by algolia' width={width} height={height}/>;
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
    SearchByAlgolia
}