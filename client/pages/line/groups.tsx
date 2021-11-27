import React from 'react'
import LineGroups from '@components/Line/Group'
import LiffLayout from '@components/Layout/LiffLayout'
import AppMeta from '@components/Meta/AppMeta'
import RequireLineSignedIn from '@components/App/RequireLineSignedIn'

export default function GroupsPage() {
  return (
    <div>
      <AppMeta title='ホーム' path='line/groups'/>
      <RequireLineSignedIn>
        <LiffLayout>
            <LineGroups />
        </LiffLayout>
      </RequireLineSignedIn>
    </div>
  )
}