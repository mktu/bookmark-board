import React from 'react'
import { PublicLayout } from '../components/Layout'
import Search from '../components/PublicSearch'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AppMeta from '../components/Meta/AppMeta'

export default function PublicSearch() {
  return (
    <div>
      <AppMeta title='公開ブックマーク' path='public-search'/>
      <PublicLayout
        header={<Header />}
        main={<Search />}
        footer={<Footer />}
      />
    </div>
  )
}