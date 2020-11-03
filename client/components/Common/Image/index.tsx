import React from 'react'
import BookmarksMainImg from './BookmarksMain'

const BookmarksSigninImg : React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({...props})=>{
    return <img src={'/BookmarksSignin.png'} alt='BookmarksSignin' {...props}/>;
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

const PlaceHolderImg : React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({...props})=>{
    return <img src={'/PlaceHolder.svg'} alt='UrlImage...' {...props}/>;
}

export {
    BookmarksMainImg,
    BookmarksSigninImg,
    GoogleSignInImg,
    NoItemImg,
    LoadingImg,
    PlaceHolderImg
}