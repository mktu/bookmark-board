import React from 'react'
import Head from 'next/head'
import Search from '../components/Search'
import { AppLayout } from '../components/Layout'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { RequireSignedIn } from '../components/App'

export default function BookmarksPage() {
    return (
        <div>
            <Head>
                <title>Bookmark 検索</title>
            </Head>
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