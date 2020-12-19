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
        clear(state){
            bookmarkAdapter.removeAll(state)
        }
    }
})

export const actions = bookmarkSlice.actions

export const {
    selectAll,
    selectIds,
    selectById,
    selectEntities
} = bookmarkAdapter.getSelectors()

// recalculate only when return value of selectAll or groupId chancges
const selectBookmarksByGroup = createSelector(
    [selectAll, (_, groupId:string)=>groupId],
    (bookmarks,groupId)=>{
        return bookmarks.filter(b=>b.groupId===groupId)
    }
)

const selectBookmarkIdsByGroup = createSelector(
    [selectAll, (_, groupId:string)=>groupId],
    (bookmarks,groupId)=>{
        return bookmarks.filter(b=>b.groupId===groupId).map(b=>b.id)
    }
)

export const useBookmarkIdsByGroup = (groupId:string) => {
    return useSelector(
        (state: { bookmarks: ReturnType<typeof bookmarkSlice.reducer> }) =>
        selectBookmarkIdsByGroup(state.bookmarks,groupId)
    )
}


export const useBookmarkByGroup = (groupId:string) => {
    return useSelector(
        (state: { bookmarks: ReturnType<typeof bookmarkSlice.reducer> }) =>
        selectBookmarksByGroup(state.bookmarks,groupId)
    )
}

export const useBookmarkById = (bookmarkId:string) => {
    return useSelector(
        (state: { bookmarks: ReturnType<typeof bookmarkSlice.reducer> }) =>
        selectById(state.bookmarks,bookmarkId)
    )
}

export default bookmarkSlice.reducer


