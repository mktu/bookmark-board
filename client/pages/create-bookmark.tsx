import React from 'react'
import { PublicLayout } from '../components/Layout'
import Create from '@components/CreateBookmark'
import PublicPageHeader from '@components/Header/PublicPageHeader'
import Footer from '../components/Footer'
import AppMeta from '../components/Meta/AppMeta'

export default function CreateBookmark() {
  return (
    <div>
      <AppMeta title='ブックマーク新規作成' path='create-bookmark'/>
      <PublicLayout
        header={<PublicPageHeader />}
        main={<Create />}
        footer={<Footer />}
      />
    </div>
  )
}