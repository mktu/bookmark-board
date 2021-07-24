import React from 'react'
import NextImage from 'next/image'
import appImage from 'public/App.png'
import { ContainedButton } from '@components/Common/Button'
import classNames from 'classnames'

export const Title = 'ブックマークを親しい人と共有したい'

export const Content: React.FC<{ handleLogin: () => void }> = ({
    handleLogin
}) => (
    <div>
        <p>
            友達や家族と好きなものを共有したい。そんな時に役立つものを目指したシンプルなブックマークサービスです
            もちろん、共有なしの個人利用もできます！
        </p>
        <div className='my-6 w-full flex justify-center'>
            <ContainedButton onClick={handleLogin}>ログインまたは登録する</ContainedButton>
        </div>
    </div>
)

// 16:9
// 4:17
export const Image = <>
    <div className={classNames('hidden md:block')}>
        <NextImage src={appImage} width={720} height={405} placeholder='blur' />
    </div>
    <div className='md:hidden shadow-lg'>
        <NextImage src={appImage} width={512} height={280} placeholder='blur'/>
    </div>
</>
