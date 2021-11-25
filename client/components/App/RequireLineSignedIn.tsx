import React from 'react'
import { LoadingLayout } from '../Layout'
import useLiff from '@hooks/useLiff'
import { LoadingImg } from '@components/Common/Image'

type Props = {
    children: React.ReactNode
}

const RequireSigned = ({ children }: Props) => {
    const { isLoggedIn, hasInit } = useLiff()

    if (isLoggedIn) {
        return (
            <>
                {children}
            </>
        )
    }

    if(hasInit && !isLoggedIn){
        return <div>Need Line apps</div>
    }

    return (
        <LoadingLayout>
            <LoadingImg />
        </LoadingLayout>
    )
}

export default RequireSigned