import React from 'react'
import { GoogleSignInImg } from '@components/Common/Image'
import { LoadingImg } from '@components/Common/Image'

type Props = {
    handleSignin: () => void,
    handleAnonymous: () => void,
    signining: boolean,
    termLink: string,
    privactPolicyLink : string
}

const WebLoginSection = ({
    handleSignin,
    signining,
    termLink,
    privactPolicyLink
}: Props) => {
    return (
        <div className='bg-primary-dark text-white py-4 px-2 flex flex-col items-center justify-center h-full'>
            <div className='w-8/12'>
                <h1 className='text-2xl font-bold mb-8 flex justify-center'>Sign In</h1>
                <div className='text-sm mb-6'>
                    <p className='my-2'>
                        <span>新規登録・ログインともにGoogleアカウントを用いて行えます。</span>
                        <a href={termLink} target='_blank' rel='noopener noreferrer' className='underline mx-2'>利用規約</a>
                        <span >/</span>
                        <a href={privactPolicyLink} target='_blank' rel='noopener noreferrer' className='underline mx-2'>プライバシーポリシー</a>
                        <span>に合意の上、ご登録ください。</span>
                    </p>
                </div>
                {signining ? (
                    <div className='flex items-center justify-center'>
                        <LoadingImg />
                    </div>
                ) : (
                    <div className='flex justify-center'>
                        <button className='bg-white p-0' onClick={handleSignin}>
                            <GoogleSignInImg className='inline-block' />
                            <span className='pl-4 pr-4 inline-block text-primary-main'>Sign in with Google</span>
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