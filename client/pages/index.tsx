import React from 'react'
import LP from '../components/LP'
import { PublicLayout } from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AppMeta from '../components/Meta/AppMeta'

export default function Home() {
  return (
    <div>
      <AppMeta />
      <PublicLayout
        header={<Header />}
        main={<LP />}
        footer={<Footer />}
      />
    </div>
  )
}