import React from 'react'

export type BookmarkServices = {
    load : (groupId:string)=>void,
    unload : (groupId:string)=>void
}

export type ContextType = {
    bookmarkServices : BookmarkServices,
}


export const initialService : BookmarkServices= {
    load : ()=>{},
    unload : ()=>{}
}

const FirebaseContext = React.createContext<ContextType>({
    bookmarkServices : initialService,
});

export default FirebaseContext;