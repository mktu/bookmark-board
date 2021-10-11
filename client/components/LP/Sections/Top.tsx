import React from 'react'
import NextImage from 'next/image'
import appImage from 'public/App.png'
import { ContainedButton } from '@components/Common/Button'
import classNames from 'classnames'
import styles from './Top.module.scss' // for dropping shadow ( not good idea )

export const Title = 'ブックマークを親しい人と共有したい'

export const Content: React.FC<{ handleLogin: () => void }> = ({
    handleLogin
}) => (
    <div>
        <p>
            友達や家族と好きなものを共有したい。そんな時に役立つものを目指したシンプルなブックマークサービスです
            もちろん、共有なしの個人利用もできます！
        </p>
        <div className='flex justify-center my-6 w-full'>
            <ContainedButton onClick={handleLogin}>ログインまたは登録する</ContainedButton>
        </div>
    </div>
)

// 16:9
// 4:17
export const Image = <>
    <div className={classNames('hidden md:block', styles.nextImageWrapper)}>
        <NextImage src={appImage} width={760} height={453} placeholder='blur' />
    </div>
    <div className={classNames('md:hidden', styles.nextImageWrapper)}>
        <NextImage src={appImage} width={512} height={305} placeholder='blur'/>
    </div>
</>
