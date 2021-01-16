import React from 'react'
import Head from 'next/head'
import Profile from '../components/Profile'
import { AppLayout } from '../components/Layout'
import Sidebar from '../components/AppMenuBar/Sidebar'
import Header from '../components/Header'
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
          header={<Header />}
        />
      </RequireSignedIn>
    </div>
  )
}