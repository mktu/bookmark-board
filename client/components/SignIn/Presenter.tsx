import React from 'react'
import { BookmarksSigninImg, GoogleSignInImg } from '../Common/Image'
import { Logo } from '../Common/Logo'

type Props = {
    handleSignin : ()=>void,
    handleAnonymous : ()=> void
}

const Presenter = ({
    handleSignin,
    handleAnonymous
}: Props) => {
    return (
        <div className='w-screen h-screen flex flex-row'>
            <div className='w-7/12 h-full flex flex-col items-center justify-center'>
                <div className='mb-8'>
                    <Logo width='300px' height='40px'/>
                </div>
                <p className='w-6/12 mb-8 text-sm'>
                    OUR-BOOKMARKSでは、気に入ったWEBサイトなどのリンクを保存し、管理することができます。保存したURLは友達や仕事仲間と共有し、ブックマークリストを一緒に成長させましょう！
                </p>
                <BookmarksSigninImg width={400} />
            </div>
            <div className='w-5/12 bg-primary-dark h-full flex flex-col items-center justify-center text-white'>
                <h1 className='text-2xl font-bold mb-8'>Sign In</h1>
                <p className='w-7/12 text-sm mb-8'>
                    新規登録・ログインともにGoogleアカウントを用いて以下のリンクより行えます。
                </p>
                <button className='bg-white p-0' onClick={handleSignin}>
                    <GoogleSignInImg className='inline-block'/> 
                    <span className='pl-4 pr-4 inline-block text-primary-main'>Sign in with Google</span>
                </button>
                <button className='border border-primary-light p-2 mt-2' onClick={handleAnonymous}>
                    Anonymous
                </button>
            </div>
        </div>
    )
}

export default Presenter;