import React from 'react'
import { useRouter } from 'next/router'
import { BookmarksSigninImg, GoogleSignInImg } from '@components/Common/Image'
import Logo from '@components/Common/Logo/Logo'
import { ButtonBase } from '@components/Common/Button'
import { LoadingImg } from '@components/Common/Image'

type Props = {
    handleMobileSignin: () => void,
    signining: boolean,
    termLink: string,
    privactPolicyLink: string
}

const CommonSection = ({
    handleMobileSignin,
    signining,
    termLink,
    privactPolicyLink
}: Props) => {
    const router = useRouter()
    return (
        <div className='flex h-full flex-col items-center justify-center p-4'>
            <ButtonBase onClick={() => {
                router.push('./')
            }}>
                <Logo theme='dark' size='lg' />
            </ButtonBase>
            <div className='mt-8 mb-4 p-4 text-sm'>
                <p>
                    <span>Bookmark-Boardでは新規登録・ログインともにGoogleアカウントを用いて行えます。</span>
                    <span>以下に合意の上、ご登録ください。</span>
                </p>
                <ul className='list-inside list-disc p-2'>
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
                    <div className='mb-16 flex items-center justify-center'>
                        <LoadingImg />
                    </div>
                ) : (
                    <button className='mb-16 flex items-center rounded bg-white p-1 shadow' onClick={handleMobileSignin}>
                        <GoogleSignInImg className='inline-block' />
                        <div className='inline-block px-4 text-primary-main'>Sign in with Google</div>
                    </button>
                )
            }
            <BookmarksSigninImg width={400} height={200} />
        </div>
    )
}

export default CommonSection;