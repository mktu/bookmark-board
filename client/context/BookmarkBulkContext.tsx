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
    moveGroup: async ()=>{
        console.log('dummy moveGroup')
    },
    checkState : 'none',
    disabled : true
}

const bulkContext = React.createContext<ContextType>(initialService);

export default bulkContext;