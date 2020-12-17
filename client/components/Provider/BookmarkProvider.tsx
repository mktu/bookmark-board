import React from 'react'
import { useBookmarkService } from '../../hooks'

type Props = {
    children: React.ReactNode
}

const DefaultProvider: React.FC<Props> = ({ children }) => {
    useBookmarkService()
    return (
        <>
            {children}
        </>
    )
}

export default DefaultProvider