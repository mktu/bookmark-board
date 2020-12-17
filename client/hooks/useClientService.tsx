import {useEffect, useState} from 'react'
import { createFirebaseService, initialService } from '../context/FirebaseContext'

const useClientService = ()=>{
    const [clientService, setClientService] = useState(initialService)
    useEffect(()=>{
        if(clientService.mock && typeof window !== 'undefined'){
            createFirebaseService().then(services => {
                setClientService(services)
            })
        }
    }, [clientService.mock])
    return clientService
}

export default useClientService