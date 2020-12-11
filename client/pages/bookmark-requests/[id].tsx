import React from 'react'
import Head from 'next/head'
import BookmarkRequests from '../../components/BookmarkRequests'
import { AppLayout } from '../../components/Layout'
import Sidebar from '../../components/Sidebar'
import {RequireSignedIn} from '../../components/App'

export default function BookmarkRequestsPage() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <RequireSignedIn>
        <AppLayout
          sidebar={<Sidebar />}
          main={<BookmarkRequests />}
        />
      </RequireSignedIn>
    </div>
  )
}