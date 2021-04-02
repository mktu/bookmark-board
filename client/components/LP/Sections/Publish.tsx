import React from 'react'
import { LpPubApp } from '../../Common/Image/Lp'
//import Link from 'next/link'

export const Title = 'ブックマークグループを公開する'
//const searchBookmarkRoot = '/public-search'

export const Content: React.ReactNode = (
    <div>
        <p>
            公開ページを作成することで、ログインしていない人向けにもブックマークリストを公開することができます。
            自分がまとめたブックマーク集を誰かに紹介したいときに使用できます。
        </p>
    </div>
)

export const Image = <LpPubApp width={457} height={544} />
