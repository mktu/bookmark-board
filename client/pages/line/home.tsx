import React from 'react'
import LiffLayout from '@components/Layout/LiffLayout'
import Home from '@components/Line/Home'
import AppMeta from '@components/Meta/AppMeta'
import LiffProvider from '@components/Provider/LiffProvider'
import { LineHomePage } from '@utils/routes'

export default function ProfilePage() {
  return (
    <div>
      <AppMeta title='ホーム' path='line/home'/>
      <LiffProvider pageUrl={LineHomePage}>
        <LiffLayout>
            <Home />
        </LiffLayout>
      </LiffProvider>
    </div>
  )
}