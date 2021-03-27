import React, { useMemo, useEffect } from 'react'
import FirebaseContext, { ContextType, upgradeAuthedService } from '../../context/FirebaseContext'
import useAuth from '../../hooks/useAuth'
import useClientService from '../../hooks/useClientService'

type Props = {
    children: React.ReactNode
}
const DefaultProvider: React.FC<Props> = ({ children }) => {
    const {clientService, setClientService} = useClientService()
    
    const uid = useAuth(clientService)
    useEffect(()=>{
        if(!uid){
            return
        }
        const {auth} = clientService
        if(auth){
            return
        }
        upgradeAuthedService(clientService).then(upgraded=>{
            setClientService(upgraded)
        })
    },[clientService,uid,setClientService])

    const value = useMemo<ContextType>(() => ({
        clientService,
        uid
    }), [clientService, uid])

    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    )
}

export default DefaultProvider