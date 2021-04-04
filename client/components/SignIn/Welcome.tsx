import React from 'react'
import { BookmarksSigninImg } from '@components/Common/Image'
import Logo from '@components/Common/Logo/Logo'
import { AppName } from '@utils/constants'

const Welcome = () => {
    return (
        <div className='flex flex-col items-center justify-center p-4 h-full'>
            <div>
                <Logo theme='dark' size='lg' />
            </div>
            <p className='p-4 md:w-6/12 text-sm my-8'>
                <span>{AppName}では、気に入ったWEBサイトなどのリンクを保存し、管理することができます。</span>
                <span>保存したURLは友達や仕事仲間と共有し、ブックマークリストを一緒に充実させましょう！</span>
            </p>
            <BookmarksSigninImg width={400} height={200} />
        </div>
    )
}

export default Welcome;