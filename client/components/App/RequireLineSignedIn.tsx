import React from 'react'
import { LoadingLayout } from '../Layout'
import useLiff from '@hooks/useLiff'
import { LoadingImg } from '@components/Common/Image'
import LiffContext from '@context/LiffContext'

type Props = {
    children: React.ReactNode
}

const RequireSigned = ({ children }: Props) => {
    const liff = useLiff()
    const { isLoggedIn, hasInit } = liff

    if (isLoggedIn) {
        return (
            <LiffContext.Provider value={liff}>
                {children}
            </LiffContext.Provider>
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