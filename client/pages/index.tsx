import React from 'react'
import Head from 'next/head'
import LP from '../components/LP'
import { PublicLayout } from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <PublicLayout
        header={<Header />}
        main={<LP />}
        footer={<Footer />}
      />
    </div>
  )
}