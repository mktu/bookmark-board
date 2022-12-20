import React from 'react'
import NextImage from "next/image";
import LpPubApp from 'public/PublicApp.png'
import { SampleUrl } from '@utils/constants'
//import Link from 'next/link'

export const Title = 'ブックマークグループを公開する'
//const searchBookmarkRoot = '/public-search'

export const Content: React.ReactNode = (
    <div>
        <p>
            公開ページを作成することで、ログインしていない人向けにもブックマークグループを公開することができます。
            自分がまとめたブックマーク集を誰かに紹介したいときに使用できます。
        </p>
        <p className='mt-2'>
            <span role='img' aria-label='right' className='mr-2'>👉</span>
            <a href={SampleUrl} target='_blank' rel='noopener noreferrer' className='underline'>サンプルの公開ブックマークグループ</a>
        </p>
    </div>
)

export const Image = <NextImage
    src={LpPubApp}
    alt='PublicApp'
    width={490}
    height={540}
    style={{
        maxWidth: "100%",
        height: "auto"
    }} />
