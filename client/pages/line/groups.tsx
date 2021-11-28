import React from 'react'
import LineGroups from '@components/Line/Group'
import LiffLayout from '@components/Layout/LiffLayout'
import AppMeta from '@components/Meta/AppMeta'
import LiffProvider from '@components/Provider/LiffProvider'

export default function GroupsPage() {
  return (
    <div>
      <AppMeta title='ホーム' path='line/groups'/>
      <LiffProvider>
        <LiffLayout>
            <LineGroups />
        </LiffLayout>
      </LiffProvider>
    </div>
  )
}