import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Baloons from 'public/undraw_Balloons_re_8ymj.svg' 
import { HelpLink } from '@utils/constants'

export const Title = '利用の始め方'
const SigninPath = '/signin'


export const Content: React.FC = () => (
    <div>
        <p>
            <span>Googleのアカウントがあれば無料で開始することができます。早速ブックマークの</span>
            <Link href={SigninPath}><a className='text-primary-main underline' href={SigninPath}>登録</a></Link>
            <span>を行いましょう！</span>
        </p>
        <p>
            <span>よくある使い方については</span>
            <span role='img' aria-label='right' className='ml-1'>👉</span>
            <a href={HelpLink} target='_blank' rel='noopener noreferrer' className='mr-1 text-primary-main underline'>こちら</a>
            <span>にも載せていますので、ぜひ確認してみてください</span>
        </p>
        <div className='my-6 flex w-full justify-center'>
            <Image src={Baloons} width={245} height={300} alt='LpStart'/>
        </div>
        <div className='my-4 text-sm'>
            <p>※動作環境について 以下のブラウザで動作確認しています</p>
            <ul className='list-inside list-disc px-2'>
                <li>Chrome ver.89-</li>
                <li>Safari ver.12-</li>
                <li>Firefox ver.87-</li>
            </ul>
        </div>
    </div>
)
