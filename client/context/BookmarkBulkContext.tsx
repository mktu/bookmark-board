import React from 'react'
import useBookmarkBulkOperation from '@hooks/useBookmarkBulkOperation'


export type ContextType = ReturnType<typeof useBookmarkBulkOperation>

export const initialService : ContextType = {
    onCheck : ()=>{
        console.log('dummy onCheck')
    },
    checkList : {},
    deleteBookmarks : async ()=>{
        console.log('dummy deleteBookmarks')
    },
    checkAll : ()=>{
        console.log('checkAll')
    },
    updateColors : async()=>{
        console.log('dummy updateColors')
    },
    checkState : 'none',
    disabled : true
}

const groupContext = React.createContext<ContextType>(initialService);

export default groupContext;