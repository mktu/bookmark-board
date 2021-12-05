import React from 'react'
import LiffLayout from '@components/Layout/LiffLayout'
import AppMeta from '@components/Meta/AppMeta'
import LiffProvider from '@components/Provider/LiffProvider'
import { LineRootPage } from '@utils/routes'

export default function ProfilePage() {
  return (
    <div>
      <AppMeta title='読み込み中' path='line'/>
      <LiffProvider pageUrl={LineRootPage}>
        <LiffLayout>
            <div />
        </LiffLayout>
      </LiffProvider>
    </div>
  )
}