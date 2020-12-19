import React, { useEffect } from 'react'
import { useAuthState } from '../../modules/authSlice'
import { useRouter } from 'next/router'
import { LoadingLayout } from '../Layout'
import { LoadingImg } from '../Common/Image'

type Props = {
    children: React.ReactNode
}

const RequireSigned = ({ children }: Props) => {
    const { authState, profileState } = useAuthState()
    const router = useRouter()
    useEffect(() => {
        if (authState === 'failed' || profileState === 'failed') {
            router.push('/signin')
        }
    }, [authState, profileState])

    if (profileState === 'loaded') {
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

export default RequireSigned