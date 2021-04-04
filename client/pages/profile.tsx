import React from 'react'
import Profile from '../components/Profile'
import { AppLayout } from '../components/Layout'
import Sidebar from '../components/Sidebar'
import AppPageHeader from '../components/Header/AppPageHeader'
import AppMeta from '../components/Meta/AppMeta'
import {RequireSignedIn} from '../components/App'

export default function ProfilePage() {
  return (
    <div>
      <AppMeta title='プロファイル' path='profile'/>
      <RequireSignedIn>
        <AppLayout
          sidebar={<Sidebar />}
          main={<Profile />}
          header={<AppPageHeader />}
        />
      </RequireSignedIn>
    </div>
  )
}