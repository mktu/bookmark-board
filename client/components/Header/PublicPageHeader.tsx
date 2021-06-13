import React from 'react'
import { useProfile } from '@modules/profileSlice'
import AppPageHeader from './AppPageHeader'
import UnauthedPageHeader from './UnauthedPageHeader'

const PublicPageHeader = () => {
    const profile = useProfile()
    if (profile.id) {
        return <AppPageHeader />
    }
    return (
        <UnauthedPageHeader />
    )
}

export default PublicPageHeader