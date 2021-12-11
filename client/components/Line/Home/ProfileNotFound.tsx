import React from 'react'
import Link from 'next/link'

type Props = {
    message: string
}

const ProfileNotFound: React.FC<Props> = ({ message }) => {
    return (
        <div className=' flex justify-center w-full h-full'>
            <div className='mt-4 w-full'>
                <h3 className='flex justify-center font-semibold text-primary-main'>
                    {message}
                </h3>
                <div className='p-4'>
                    <p className='text-primary-main'>
                        <Link href='/'>
                            <a href={'/'} className='inline-flex underline'>Bookmark-Board</a>
                        </Link>
                        <span>にてLINE連携されていることを確認してください</span>
                        <span role='img' aria-label='sorry'>🙇‍♂️</span>
                    </p>
                    <p className='mt-2 text-sm text-primary-dark'>
                        ※ LINE連携はお手数ですがWEBブラウザ上から行っていただくようお願いします。
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProfileNotFound