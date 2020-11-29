import React from 'react'
import Head from 'next/head'
import Bookmarks from '../../components/Bookmarks'
import { AppLayout } from '../../components/Layout'
import Sidebar from '../../components/Sidebar'
import {RequireSignedIn} from '../../components/App'

export default function BookmarksPage() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <RequireSignedIn>
        <AppLayout
          sidebar={<Sidebar />}
          main={<Bookmarks />}
        />
      </RequireSignedIn>
    </div>
  )
}