import {useEffect, useState} from 'react'
import { createInitialService, initialService } from '../context/FirebaseContext'

const useClientService = ()=>{
    const [clientService, setClientService] = useState(initialService)
    useEffect(()=>{
        if(clientService.mock && typeof window !== 'undefined'){
            createInitialService().then(services => {
                setClientService(services)
            })
        }
    }, [clientService.mock])
    return {clientService,setClientService}
}

export default useClientService