import React from 'react'
import { LpPlugin } from '@components/Common/Image/Lp'
import { PluginUrl } from '@utils/constants'

export const Title = '拡張機能でより便利に'

export const Content: React.ReactNode = (
    <div>
        <p>
            Chrome拡張をインストールすることで、Bookmark-Boardのページに移動しなくとも、
            閲覧しているページ上でブックマークの追加が行えるようになります。
        </p>
        <p className='mt-2'>
            <span role='img' aria-label='right' className='mr-2'>👉</span>
            <a href={PluginUrl} target='_blank' rel='noopener noreferrer' className='underline mx-2'>Chromeのストア</a>
            <span>からインストールすることができます</span>
        </p>
    </div>
)

export const Image = <LpPlugin width={545} height={400} />
