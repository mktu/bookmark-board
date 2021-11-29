import React from 'react'
import LineGroups from '@components/Line/Group'
import LiffLayout from '@components/Layout/LiffLayout'
import AppMeta from '@components/Meta/AppMeta'
import LiffProvider from '@components/Provider/LiffProvider'
import { LineGroupsPage } from '@utils/routes'

export default function GroupsPage() {
  return (
    <div>
      <AppMeta title='グループ一覧' path='line/groups'/>
      <LiffProvider pageUrl={LineGroupsPage}>
        <LiffLayout>
            <LineGroups />
        </LiffLayout>
      </LiffProvider>
    </div>
  )
}