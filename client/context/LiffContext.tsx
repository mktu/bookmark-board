import React from 'react'
import useLiff from '@hooks/useLiff'


export type ContextType = ReturnType<typeof useLiff>

export const initialService : ContextType = {
    hasInit : false,
    isLineClient : false,
    isLoggedIn : false,
    lineProfile : undefined
}

const bulkContext = React.createContext<ContextType>(initialService);

export default bulkContext;