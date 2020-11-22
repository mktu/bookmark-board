import React from 'react'

export const createFirebaseService = async () => {
    return {
        ...await import('../services/auth'),
        ...await import('../services/profile'),
        ...await import('../services/group'),
        ...await import('../services/bookmark'),
        mock : false
    }
}
export type FirebaseClientServiceType = ReturnType<typeof createFirebaseService> extends Promise<infer T> ? T : never;

export type ContextType = {
    clientService : FirebaseClientServiceType,
}

export const createMock = (func: (name: string) => (...args: []) => void) => {
    const mock: FirebaseClientServiceType = {
        logout : func('logout'),
        loginByGoogle : func('loginByGoogle'),
        loginWithAnonymous : func('loginWithAnonymous'),
        listenAuthState : () => {func('listenAuthState')(); return ()=>{1}},
        linkWithGoogle : func('linkWithGoogle'),
        addProfile : func('addProfile'),
        listenProfile : () => {func('listenProfile')(); return ()=>{1}},
        getProfile : func('getProfile'),
        uploadProfileImage : func('uploadProfileImage'),
        updateProfile: func('updateProfile'),
        addGroup : func('addGroup'),
        getGroups : func('addGroup'),
        modifyGroup : func('modifyGroup'),
        listenGroups : () => {func('listenGroups')(); return ()=>{1}},
        addBookmark : func('addBookmark'),
        modifyBookmark : func('modifyBookmark'),
        deleteBookmark : func('deleteBookmark'),
        listenBookmarks : () => {func('listenBookmarks')(); return ()=>{1}},
        changeOrder : func('changeOrder'),
        mock:true
    }
    return mock;
}

export const initialService = createMock(()=>()=>{1})

const FirebaseContext = React.createContext<ContextType>({
    clientService : initialService,
});

export default FirebaseContext;