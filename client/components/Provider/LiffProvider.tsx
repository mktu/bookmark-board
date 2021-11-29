import React from 'react'
import useLiff from '@hooks/useLiff'
import LiffContext from '@context/LiffContext'

type Props = {
    children: React.ReactNode,
    pageUrl: string // for local debugging
}

const Provider = ({ children, pageUrl }: Props) => {
    const liff = useLiff(pageUrl)
    return (
        <LiffContext.Provider value={liff}>
            {children}
        </LiffContext.Provider>
    )
}

export default Provider