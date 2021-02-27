import React from 'react'
import BookmarkRequests from '../../components/BookmarkRequests'
import { AppLayout } from '../../components/Layout'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import AppMeta from '../../components/Meta/AppMeta'
import {RequireSignedIn} from '../../components/App'

export default function BookmarkRequestsPage() {
  return (
    <div>
      <AppMeta title='編集参加' path='bookmark-request'/>
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