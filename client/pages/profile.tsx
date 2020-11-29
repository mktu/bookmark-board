import React from 'react'
import Head from 'next/head'
import Profile from '../components/Profile'
import { AppLayout } from '../components/Layout'
import Sidebar from '../components/Sidebar'
import {RequireSignedIn} from '../components/App'

export default function ProfilePage() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <RequireSignedIn>
        <AppLayout
          sidebar={<Sidebar />}
          main={<Profile />}
        />
      </RequireSignedIn>
    </div>
  )
}