import React from 'react'
import LineHome from '@components/Line/Home'
import LiffLayout from '@components/Layout/LiffLayout'
import AppMeta from '@components/Meta/AppMeta'
import RequireLineSignedIn from '@components/App/RequireLineSignedIn'

export default function GroupsPage() {
  return (
    <div>
      <AppMeta title='ホーム' path='line/groups'/>
      <RequireLineSignedIn>
        <LiffLayout>
            <LineHome />
        </LiffLayout>
      </RequireLineSignedIn>
    </div>
  )
}