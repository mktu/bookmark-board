import React from 'react'
import useLiff from '@hooks/useLiff'


export type ContextType = ReturnType<typeof useLiff>

export const initialService : ContextType = {
    hasInit : false,
    clientType : 'none',
    isLoggedIn : false,
    idToken : '',
    lineProfile : undefined,
    closure : {
        close : async ()=> {
            console.log('dummy')
        }
    }
}

const bulkContext = React.createContext<ContextType>(initialService);

export default bulkContext;