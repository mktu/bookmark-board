import React from 'react'
import LineHome from '@components/Line/Home'
import LiffLayout from '@components/Layout/LiffLayout'
import AppMeta from '@components/Meta/AppMeta'
import RequireLineSignedIn from '@components/App/RequireLineSignedIn'

export default function ProfilePage() {
  return (
    <div>
      <AppMeta title='ホーム' path='line'/>
      <RequireLineSignedIn>
        <LiffLayout>
            <LineHome />
        </LiffLayout>
      </RequireLineSignedIn>
    </div>
  )
}