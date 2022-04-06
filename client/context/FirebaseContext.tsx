import React from 'react'

const createFirebaseService = async () => {
    const auth = await import('../services/auth')
    const others = await import('./LazyLoads')

    return {
        ...auth,
        ...others.services,
        mock : false,
        auth : true
    }
}

export type FirebaseClientServiceType = ReturnType<typeof createFirebaseService> extends Promise<infer T> ? T : never;

export const createInitialService : ()=> Promise<FirebaseClientServiceType> = async () => {
    return {
        ...initialService,
        ...await import('../services/auth'),
        mock : false,
        auth : false
    }
}

export const upgradeAuthedService = async (original : FirebaseClientServiceType) => {
    const others = await import('./LazyLoads')
    return {
        ...original,
        ...others.services,
        mock : false,
        auth : true
    }
}

export type ContextType = {
    clientService : FirebaseClientServiceType,
    uid?:string
}

export const createMock = (func: (name: string) => (...args: []) => void) => {
    const mock: FirebaseClientServiceType = {
        logout : func('logout'),
        loginByGoogle : func('loginByGoogle'),
        loginByGoogleWithRedirect : func('loginByGoogleWithRedirect'),
        loginWithAnonymous : func('loginWithAnonymous'),
        listenAuthState : () => {func('listenAuthState')(); return ()=>{1}},
        linkWithGoogle : func('linkWithGoogle'),
        getIdToken : async () => '',
        addProfile : func('addProfile'),
        listenProfile : () => {func('listenProfile')(); return ()=>{1}},
        getMyProfile : func('addProfile'),
        getProfile : func('getProfile'),
        getProfiles : func('getProfiles'),
        uploadProfileImage : func('uploadProfileImage'),
        updateProfile: func('updateProfile'),
        addGroup : func('addGroup'),
        getGroups : func('getGroups'),
        getGroup : func('getGroup'),
        deleteGroup : async ()=>{func('deleteGroup')},
        modifyGroup : func('modifyGroup'),
        changeGroupOrder : func('changeGroupOrder'),
        listenGroups : () => {func('listenGroups')(); return ()=>{1}},
        addReaction : func('addReaction'),
        deleteReaction : func('deleteReaction'),
        listenReactions : () => {func('listenReactions')(); return ()=>{1}},
        addComment : func('addComment'),
        updateComment : func('updateComment'),
        listenComments : () => {func('listenComments')(); return ()=>{1}},
        addRequest : func('addRequest'),
        updateRequest : func('updateRequest'),
        listenRequest : () => {func('listenRequest')(); return ()=>{1}},
        removeRequest : func('removeRequest'),
        addBookmark : func('addBookmark'),
        modifyBookmark : func('modifyBookmark'),
        modifyBookmarks: async ()=>{func('modifyBookmarks')},
        deleteBookmark : func('deleteBookmark'),
        deleteBookmarks : async ()=>{func('deleteBookmarks')},
        moveGroup : func('moveGroup'),
        moveGroupAsync : async ()=>{func('moveGroupAsync')},
        listenBookmarks : () => {func('listenBookmarks')(); return ()=>{1}},
        changeOrder : func('changeOrder'),
        uploadFile : func('uploadFile'),
        scrapeUrl : async ()=>{func('scrapeUrl'); return {url:'', images:[]}},
        completeBookmark : async ()=>{func('completeBookmark'); },
        createAlgoliaIndex : async ()=>{func('createAlgoliaIndex'); },
        updateAlgoliaIndex : async ()=>{func('updateAlgoliaIndex'); },
        deleteAlgoliaIndex : async ()=>{func('deleteAlgoliaIndex'); },
        getNotifications : async ()=>{func('getNotifications'); return []},
        updateNotification : async ()=>{func('updateNotification'); },
        listenNotifications : ()=>{func('listenNotifications'); return ()=>{1}},
        readNotifications: async ()=>{func('readNotifications');},
        listenBookmarkSimilarities: () => {func('listenBookmarkSimilarities')(); return ()=>{1}},
        getBookmarkSimilarity: async ()=>{func('getBookmarkSimilarity'); return null},
        listenSimilarityIgnoreList: () => {func('listenSimilarityIgnoreList')(); return ()=>{1}},
        addIgnoreList: async ()=>{func('addIgnoreList'); return },
        mock : true,
        auth : false
    }
    return mock;
}

export const initialService = createMock(()=>()=>{1})

const FirebaseContext = React.createContext<ContextType>({
    clientService : initialService,
});

export default FirebaseContext;