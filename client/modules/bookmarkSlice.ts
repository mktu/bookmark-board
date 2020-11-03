import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const bookmarkAdapter = createEntityAdapter<Bookmark>({
    sortComparer : (a,b)=>{
        return a.idx - b.idx
    }
})

const initialState = bookmarkAdapter.getInitialState()

const bookmarkSlice = createSlice({
    name : 'bookmarks',
    initialState,
    reducers : {
        add(state,action : PayloadAction<Bookmark[]>){
            bookmarkAdapter.upsertMany(state, action.payload)
        },
        modify(state,action : PayloadAction<Bookmark[]>){
            bookmarkAdapter.updateMany(state, action.payload.map(b=>({id:b.id, changes : b})))
        },
        delete(state,action : PayloadAction<Bookmark[]>){
            bookmarkAdapter.removeMany(state, action.payload.map(b=>b.id))
        },
    }
})

export const actions = bookmarkSlice.actions

export const {
    selectAll,
    selectIds,
    selectById,
    selectEntities
} = bookmarkAdapter.getSelectors()

export const selectBookmarksByGroup = createSelector(
    [selectAll, (_, groupId:string)=>groupId],
    (bookmarks,groupId)=>{
        console.log(bookmarks)
        return bookmarks.filter(b=>b.groupId===groupId)
    }
)


export const useBookmarkByGroup = (groupId:string) => {
    return useSelector(
        (state: { bookmarks: ReturnType<typeof bookmarkSlice.reducer> }) =>
        selectBookmarksByGroup(state.bookmarks,groupId)
    )
}

export default bookmarkSlice.reducer


