import React from 'react'

export const createFirebaseService = async () => {
    return {
        ...await import('../services/auth'),
        ...await import('../services/profile'),
        mock : false
    }
}
export type FirebaseClientServiceType = ReturnType<typeof createFirebaseService> extends Promise<infer T> ? T : never;

export type ContextType = {
    clientService : FirebaseClientServiceType,
}

export const createMock = (func: (name: string) => (...args: any[]) => void) => {
    const mock: FirebaseClientServiceType = {
        logout : func('logout'),
        loginByGoogle : func('loginByGoogle'),
        loginWithAnonymous : func('loginWithAnonymous'),
        listenAuthState : () => {func('listenAuthState')(); return ()=>{}},
        linkWithGoogle : func('linkWithGoogle'),
        addProfile : func('addProfile'),
        listenProfile : () => {func('listenProfile')(); return ()=>{}},
        getProfile : func('getProfile'),
        mock:true
    }
    return mock;
}

export const initialService = createMock(()=>()=>{})

const FirebaseContext = React.createContext<ContextType>({
    clientService : initialService,
});

export default FirebaseContext;