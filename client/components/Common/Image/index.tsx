import React from 'react'
import Image from "next/image";

const BookmarksSigninImg: React.FC<{ width?: number, height?: number }> = ({ width, height }) => {
    return (
        <Image
            src={'/BookmarksSignin.svg'}
            alt='BookmarksSignin'
            width={width}
            height={height}
            style={{
                maxWidth: "100%",
                height: "auto"
            }} />
    );
}

const GoogleSignInImg: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ ...props }) => {
    return <img src={'/GoogleSignin.svg'} alt='BookmarksSignin' {...props} />;
}

const NoItemImg: React.FC<{ width?: number, height?: number }> = ({ width, height }) => {
    return (
        <Image
            width={width}
            height={height}
            src={'/NoItem.svg'}
            alt='NoItem'
            style={{
                maxWidth: "100%",
                height: "auto"
            }} />
    );
}

const LoadingImg: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ ...props }) => {
    return <img src={'/Loading.svg'} alt='Loading...' {...props} />;
}

const PlaceHolderImg: React.FC<{ width?: number, height?: number }> = ({ width, height }) => {
    return (
        <Image
            src={'/Placeholder.svg'}
            alt='PlaceholderImage'
            width={width}
            height={height}
            style={{
                maxWidth: "100%",
                height: "auto"
            }} />
    );
}

const BookmarkHome: React.FC<{ width?: number, height?: number }> = ({ width, height }) => {
    return (
        <Image
            src={'/undraw_creative_team_r90h.svg'}
            alt='BookmarkHome'
            width={width}
            height={height}
            style={{
                maxWidth: "100%",
                height: "auto"
            }} />
    );
}

const WelcomeImg: React.FC<{ width?: number, height?: number }> = ({ width, height }) => {
    return (
        <Image
            src={'/Welcoming.svg'}
            alt='Welcoming'
            width={width}
            height={height}
            style={{
                maxWidth: "100%",
                height: "auto"
            }} />
    );
}

const SigninImg: React.FC<{ width?: number, height?: number }> = ({ width, height }) => {
    return (
        <Image
            src={'/StepToTheSun.svg'}
            alt='StepToTheSun'
            width={width}
            height={height}
            style={{
                maxWidth: "100%",
                height: "auto"
            }} />
    );
}

const SearchByAlgolia: React.FC<{ width?: number, height?: number }> = ({ width, height }) => {
    return (
        <Image
            src={'/search-by-algolia-light-background.svg'}
            alt='Search by algolia'
            width={width}
            height={height}
            style={{
                maxWidth: "100%",
                height: "auto"
            }} />
    );
}


export {
    BookmarksSigninImg,
    GoogleSignInImg,
    NoItemImg,
    LoadingImg,
    PlaceHolderImg,
    WelcomeImg,
    SigninImg,
    SearchByAlgolia,
    BookmarkHome
}