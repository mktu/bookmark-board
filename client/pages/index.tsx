import React from 'react'
import LP from '../components/LP'
import { PublicLayout } from '../components/Layout'
import PublicPageHeader from '../components/Header/PublicPageHeader'
import Footer from '../components/Footer'
import AppMeta from '../components/Meta/AppMeta'

export default function Home() {
  return (
    <div>
      <AppMeta />
      <PublicLayout
        header={<PublicPageHeader />}
        main={<LP />}
        footer={<Footer />}
        fixedHeader
      />
    </div>
  )
}