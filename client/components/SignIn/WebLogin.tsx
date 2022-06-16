import React from 'react'
import { GoogleSignInImg } from '@components/Common/Image'
import { LoadingImg } from '@components/Common/Image'

type Props = {
    handleSignin: () => void,
    handleAnonymous: () => void,
    signining: boolean,
    termLink: string,
    privactPolicyLink: string
}

const WebLoginSection = ({
    handleSignin,
    signining,
    termLink,
    privactPolicyLink
}: Props) => {
    return (
        <div className='flex flex-col justify-center items-center py-4 px-2 h-full text-white bg-primary-dark'>
            <div className='w-7/12'>
                <h1 className='flex justify-center mb-8 text-2xl font-bold'>Sign In</h1>
                <div className='mb-6 text-sm'>
                    <p className='my-2'>
                        <span>新規登録・ログインともにGoogleアカウントを用いて行えます。</span>
                        <a href={termLink} target='_blank' rel='noopener noreferrer' className='underline'>利用規約</a>
                        <span>と</span>
                        <a href={privactPolicyLink} target='_blank' rel='noopener noreferrer' className='underline'>プライバシーポリシー</a>
                        <span>に合意の上、ご登録ください。</span>
                    </p>
                </div>
                {signining ? (
                    <div className='flex justify-center items-center'>
                        <LoadingImg />
                    </div>
                ) : (
                    <div className='flex justify-center'>
                        <button className='p-0 bg-white' id='google-login' onClick={handleSignin}>
                            <GoogleSignInImg className='inline-block' />
                            <span className='inline-block px-4 text-primary-main'>Sign in with Google</span>
                        </button>
                        {/* <button className='border border-primary-light p-2 mt-2' onClick={handleAnonymous}>
                        Anonymous
                        </button> */}
                    </div>
                )}
            </div>
        </div>
    )
}

export default WebLoginSection;