import React from 'react'
import Head from 'next/head'
import BookmarkRequests from '../../components/BookmarkRequests'
import { AppLayout } from '../../components/Layout'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import {RequireSignedIn} from '../../components/App'

export default function BookmarkRequestsPage() {
  return (
    <div>
      <Head>
        <title>Bookmark 編集参加リクエスト</title>
      </Head>
      <RequireSignedIn>
        <AppLayout
          sidebar={<Sidebar />}
          main={<BookmarkRequests />}
          header={<Header />}
        />
      </RequireSignedIn>
    </div>
  )
}