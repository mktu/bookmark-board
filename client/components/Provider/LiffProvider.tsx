import React from 'react'
import useLiff from '@hooks/useLiff'
import LiffContext from '@context/LiffContext'

type Props = {
    children: React.ReactNode
}

const Provider = ({ children }: Props) => {
    const liff = useLiff()
    return (
        <LiffContext.Provider value={liff}>
            {children}
        </LiffContext.Provider>
    )
}

export default Provider