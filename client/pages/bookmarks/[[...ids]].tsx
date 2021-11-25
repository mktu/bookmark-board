import React from 'react'
import Bookmarks from '@components/Bookmarks'
import DndProvider from '@components/Provider/DndProvider'
import { AppLayout } from '@components/Layout'
import Sidebar from '@components/Sidebar'
import AppPageHeader from '@components/Header/AppPageHeader'
import AppMeta from '@components/Meta/AppMeta'
import RequireSignedIn from '@components/App/RequireSignedIn'

export default function BookmarksPage() {
  return (
    <div>
      <AppMeta title='編集' path='bookmarks'/>
      <RequireSignedIn>
        <DndProvider>
          <AppLayout
            sidebar={<Sidebar />}
            main={<Bookmarks />}
            header={<AppPageHeader />}
          />
        </DndProvider>
      </RequireSignedIn>
    </div>
  )
}