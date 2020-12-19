import React, { useEffect } from 'react'
import { useAuthState } from '../../modules/authSlice'
import { useRouter } from 'next/router'
import { LoadingLayout } from '../Layout'
import { LoadingImg } from '../Common/Image'

type Props = {
    children: React.ReactNode
}

const RequireNotSignedIn = ({ children }: Props) => {
    const { authState, profileState } = useAuthState()
    const router = useRouter()
    useEffect(() => {
        // if signed in transition to bookmark root
        if (profileState === 'loaded') {
            router.push('/bookmarks')
        }
    }, [profileState])

    if (authState === 'failed' || authState === 'loaded') {
        return (
            <>
                {children}
            </>
        )
    }
    return (
        <LoadingLayout>
            <LoadingImg />
        </LoadingLayout>
    )
}

export default RequireNotSignedIn