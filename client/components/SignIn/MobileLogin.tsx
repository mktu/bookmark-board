import React from 'react'
import { BookmarksSigninImg, GoogleSignInImg } from '@components/Common/Image'
import Logo from '@components/Common/Logo/Logo'
import { LoadingImg } from '@components/Common/Image'

type Props = {
    handleMobileSignin: () => void,
    signining: boolean,
    termLink: string,
    privactPolicyLink : string
}

const CommonSection = ({
    handleMobileSignin,
    signining,
    termLink,
    privactPolicyLink
}: Props) => {
    return (
        <div className='flex flex-col items-center justify-center p-4 h-full'>
            <div>
                <Logo theme='dark' size='lg' />
            </div>
            <div className='p-4 text-sm mt-8 mb-4'>
                <p>
                    <span>Bookmark-Boardでは新規登録・ログインともにGoogleアカウントを用いて行えます。</span>
                    <span>以下に合意の上、ご登録ください。</span>
                </p>
                <ul className='p-2 list-disc list-inside'>
                    <li>
                        <a href={termLink} target='_blank' rel='noopener noreferrer' className='underline'>利用規約</a>
                    </li>
                    <li>
                        <a href={privactPolicyLink} target='_blank' rel='noopener noreferrer' className='underline'>プライバシーポリシー</a>
                    </li>
                </ul>
            </div>
            {
                signining ? (
                    <div className='flex items-center justify-center mb-16'>
                        <LoadingImg />
                    </div>
                ) : (
                    <button className='mb-16 flex items-center shadow bg-white p-1 rounded' onClick={handleMobileSignin}>
                        <GoogleSignInImg className='inline-block' />
                        <div className='pl-4 pr-4 inline-block text-primary-main'>Sign in with Google</div>
                    </button>
                )
            }
            <BookmarksSigninImg width={400} height={200} />
        </div>
    )
}

export default CommonSection;