import React from 'react'
import LineHome from '@components/Line/Home'
import LiffLayout from '@components/Layout/LiffLayout'
import AppMeta from '@components/Meta/AppMeta'
import LiffProvider from '@components/Provider/LiffProvider'
import { LineHomePage } from '@utils/routes'

export default function ProfilePage() {
  return (
    <div>
      <AppMeta title='ホーム' path='line'/>
      <LiffProvider pageUrl={LineHomePage}>
        <LiffLayout>
            <LineHome />
        </LiffLayout>
      </LiffProvider>
    </div>
  )
}