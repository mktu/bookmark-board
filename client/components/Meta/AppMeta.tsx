import React from 'react'
import Head from 'next/head'
import { AppName } from '../../utils/constants'
import { getOrigin } from '../../utils'

type Props = {
    title ?: string,
    path ?: string
}

const AppMeta : React.FC<Props> = ({
    title,
    path
}) =>(
    <Head>
        <title>{title ? `${title} | ${AppName}` : AppName}</title>
        <meta property="og:title" content={title ? `${title} | ${AppName}` : AppName} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={path? `${getOrigin()}/${path}` : getOrigin()} />
        <meta property="og:description" content={'お気に入りを管理しよう'} />
        <meta property="og:image" content={`https://og-image-lilac-kappa.vercel.app/-Manage%20your%20favorites-.png?theme=dark`} />
        <meta property="og:site_name" content={AppName} />
        <meta name="twitter:title" content={title ? `${title} | ${AppName}` : AppName} />
        <meta name="twitter:site" content='' />
        <meta name="twitter:card" content='summary_large_image' />
        <meta name="twitter:description" content='お気に入りを管理しよう' />
        <meta name="twitter:image" content={`https://og-image-lilac-kappa.vercel.app/-Manage%20your%20favorites-.png?theme=dark`} />
      </Head>
)

export default AppMeta