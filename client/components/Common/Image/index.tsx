import React from 'react'
import BookmarksMainImg from './BookmarksMain'

const BookmarksSigninImg : React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({...props})=>{
    return <img src={'/BookmarksSignin.png'} alt='BookmarksSignin' {...props}/>;
}

const GoogleSignInImg : React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({...props})=>{
    return <img src={'/GoogleSignin.svg'} alt='BookmarksSignin' {...props}/>;
}

export {
    BookmarksMainImg,
    BookmarksSigninImg,
    GoogleSignInImg
}