import React from 'react'
import NextImage from 'next/image'
import LpPlugin from 'public/Plugin.png'
import LineBookmarkBoard from 'public/LineBookmarkBoard.png'
import { PluginUrl } from '@utils/constants'
import LineIcon from '@components/Common/Icon/LineLogin'
import styles from './Image.module.scss'
import classNames from 'classnames'
import { Carousel } from 'react-responsive-carousel';



export const Title = '拡張機能でより便利に'

export const Content: React.ReactNode = (
    <div>
        <p>
            Chrome拡張をインストールすることで、Bookmark-Boardのページに移動しなくとも、
            閲覧しているページ上でブックマークの追加が行えるようになります。
        </p>
        <p className='mt-2'>
            <span role='img' aria-label='right' className='mr-2'>👉</span>
            <a href={PluginUrl} target='_blank' rel='noopener noreferrer' className='mx-2 underline'>Chromeのストア</a>
            <span>からインストールすることができます</span>
        </p>
        <p className='mt-6 align-middle'>
            <span>また、</span>
            <LineIcon className='inline-block mx-1 w-6 h-6' />
            <span>LINEアカウントをお持ちの方はLINE連携の設定を行うことで、
                公式アカウントへのチャットを通じてブックマーク登録を行うことができるようになります
            </span>
        </p>
    </div>
)

export const Image = <NextImage alt='Plugin' src={LpPlugin} width={545} height={400} />

export const LineImage = (
    <Carousel showStatus={false}>
        <div className={classNames('flex justify-center items-center', styles.nextImageWrapper)}>
            <span className='rounded-xl shadow-2xl' >
                <NextImage alt='Line' src={LineBookmarkBoard} width={185} height={400} />
            </span>
        </div>
        <div className={classNames('flex justify-center items-center', styles.nextImageWrapper)}>
            <span className='rounded-xl shadow-2xl' >
                <NextImage alt='Plugin' src={LpPlugin} width={545} height={400} />
            </span>
        </div>
    </Carousel>

)