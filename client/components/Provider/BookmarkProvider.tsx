import React from 'react'
import useRegistrantsService from '../../hooks/useRegistrantsService'

type Props = {
    children: React.ReactNode
}

const DefaultProvider: React.FC<Props> = ({ children }) => {
    useRegistrantsService()
    return (
        <>
            {children}
        </>
    )
}

export default DefaultProvider