import React from 'react'
import { AppLayout } from '@components/Layout'
import Sidebar from '@components/Sidebar'
import AnalyzeBookmarks from '@components/AnalyzeBookmarks'
import AppPageHeader from '@components/Header/AppPageHeader'
import AppMeta from '@components/Meta/AppMeta'
import RequireSignedIn from '@components/App/RequireSignedIn'

export default function AnalyzePage() {
    return (
        <>
            <AppMeta title='分析' path='analyze' />
            <RequireSignedIn>
                <AppLayout
                    sidebar={<Sidebar />}
                    main={<AnalyzeBookmarks />}
                    header={<AppPageHeader />}
                />
            </RequireSignedIn>
        </>
    )
}