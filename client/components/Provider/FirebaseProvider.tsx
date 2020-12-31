import React, { useMemo } from 'react'
import FirebaseContext, { ContextType } from '../../context/FirebaseContext'
import useAuth from '../../hooks/useAuth'
import useClientService from '../../hooks/useClientService'

type Props = {
    children: React.ReactNode
}
const DefaultProvider: React.FC<Props> = ({ children }) => {
    const clientService = useClientService()
    useAuth(clientService)

    const value = useMemo<ContextType>(() => ({
        clientService,
    }), [clientService])

    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    )
}

export default DefaultProvider