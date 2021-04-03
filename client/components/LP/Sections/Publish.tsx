import React from 'react'
import { LpPubApp } from '@components/Common/Image/Lp'
import { SampleUrl } from '@utils/constants'
//import Link from 'next/link'

export const Title = 'ブックマークグループを公開する'
//const searchBookmarkRoot = '/public-search'

export const Content: React.ReactNode = (
    <div>
        <p>
            公開ページを作成することで、ログインしていない人向けにもブックマークリストを公開することができます。
            自分がまとめたブックマーク集を誰かに紹介したいときに使用できます。
        </p>
        <p className='mt-2'>
            <span role='img' aria-label='right' className='mr-2'>👉</span>
            <a href={SampleUrl} target='_blank' rel='noopener noreferrer' className='underline'>サンプルの公開ブックマークリスト</a>
        </p>
    </div>
)

export const Image = <LpPubApp width={457} height={544} />
