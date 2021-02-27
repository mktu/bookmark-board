import React from 'react'
import Search from '../components/Search'
import { AppLayout } from '../components/Layout'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { RequireSignedIn } from '../components/App'
import AppMeta from '../components/Meta/AppMeta'

export default function BookmarksPage() {
    return (
        <div>
            <AppMeta title='検索' path='search'/>
            <RequireSignedIn>
                <AppLayout
                    sidebar={<Sidebar />}
                    main={<Search />}
                    header={<Header />}
                />
            </RequireSignedIn>
        </div>
    )
}