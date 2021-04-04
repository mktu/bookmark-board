import React from 'react'
import { PublicLayout } from '../components/Layout'
import Search from '../components/PublicSearch'
import PublicPageHeader from '../components/Header/PublicPageHeader'
import Footer from '../components/Footer'
import AppMeta from '../components/Meta/AppMeta'

export default function PublicSearch() {
  return (
    <div>
      <AppMeta title='公開ブックマーク' path='public-search'/>
      <PublicLayout
        header={<PublicPageHeader />}
        main={<Search />}
        footer={<Footer />}
      />
    </div>
  )
}