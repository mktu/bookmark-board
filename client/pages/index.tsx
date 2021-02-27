import React from 'react'
import Head from 'next/head'
import LP from '../components/LP'
import { PublicLayout } from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AppName } from '../utils/constants'

export default function Home() {
  return (
    <div>
      <Head>
        <title>{AppName}</title>
        <meta property="og:title" content={AppName} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://our-bookmarks.vercel.app/public-bookmarks`} />
        <meta property="og:description" content={'お気に入りを管理しよう'} />
        <meta property="og:image" content={`https://og-image-lilac-kappa.vercel.app/-Manage%20your%20favorites-.png?theme=dark`} />
        <meta property="og:site_name" content={AppName} />
        <meta name="twitter:title" content={AppName} />
        <meta name="twitter:site" content='' />
        <meta name="twitter:card" content='summary_large_image' />
        <meta name="twitter:description" content='お気に入りを管理しよう' />
        <meta name="twitter:image" content={`https://og-image-lilac-kappa.vercel.app/-Manage%20your%20favorites-.png?theme=dark`} />
      </Head>
      <PublicLayout
        header={<Header />}
        main={<LP />}
        footer={<Footer />}
      />
    </div>
  )
}