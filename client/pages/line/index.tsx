import React from 'react'
import LineHome from '@components/Line/Home'
import LiffLayout from '@components/Layout/LiffLayout'
import AppMeta from '@components/Meta/AppMeta'
import LiffProvider from '@components/Provider/LiffProvider'

export default function ProfilePage() {
  return (
    <div>
      <AppMeta title='ホーム' path='line'/>
      <LiffProvider>
        <LiffLayout>
            <LineHome />
        </LiffLayout>
      </LiffProvider>
    </div>
  )
}