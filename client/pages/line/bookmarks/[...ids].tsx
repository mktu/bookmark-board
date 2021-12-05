import React from 'react'
import { useRouter } from 'next/router'
import Bookmark from '@components/Line/Bookmark'
import LiffLayout from '@components/Layout/LiffLayout'
import AppMeta from '@components/Meta/AppMeta'
import LiffProvider from '@components/Provider/LiffProvider'
import { parseBookmarkRoutes, LineBookmarkPage } from '@utils/routes'

export default function BookmarkPage() {
  const router = useRouter()
  const { ids } = router.query
  const { groupId, bookmarkId } = parseBookmarkRoutes(ids)
  return (
    <div>
      <AppMeta title='ブックマーク' path='line/bookmark' />
      <LiffProvider  pageUrl={(groupId && bookmarkId) ? LineBookmarkPage(groupId, bookmarkId) : ''}>
        <LiffLayout>
          <Bookmark {...{ groupId, bookmarkId }}/>
        </LiffLayout>
      </LiffProvider>
    </div>
  )
}