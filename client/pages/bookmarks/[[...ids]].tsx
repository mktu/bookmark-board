import React from 'react'
import Head from 'next/head'
import Bookmarks from '../../components/Bookmarks'
import DndProvider from '../../components/Provider/DndProvider'
import { AppLayout } from '../../components/Layout'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import { RequireSignedIn } from '../../components/App'

export default function BookmarksPage() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <RequireSignedIn>
        <DndProvider>
          <AppLayout
            sidebar={<Sidebar />}
            main={<Bookmarks />}
            header={<Header />}
          />
        </DndProvider>
      </RequireSignedIn>
    </div>
  )
}