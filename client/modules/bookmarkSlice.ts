import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const bookmarkAdapter = createEntityAdapter<Bookmark>({
    sortComparer : (a,b)=>{
        return a.idx - b.idx
    }
})

const initialState = bookmarkAdapter.getInitialState<{
    status : LoadStatus['status']
}>({
    status : 'loading'
})

const bookmarkSlice = createSlice({
    name : 'bookmarks',
    initialState,
    reducers : {
        add(state,action : PayloadAction<Bookmark[]>){
            state.status = 'loaded'
            bookmarkAdapter.upsertMany(state, action.payload)
        },
        modify(state,action : PayloadAction<Bookmark[]>){
            bookmarkAdapter.updateMany(state, action.payload.map(b=>({id:b.id, changes : b})))
        },
        delete(state,action : PayloadAction<Bookmark[]>){
            bookmarkAdapter.removeMany(state, action.payload.map(b=>b.id))
        },
        removeGroup(state,action : PayloadAction<string>){
            const ids = selectBookmarkIdsByGroup(state,action.payload)
            bookmarkAdapter.removeMany(state, ids)
        },
        clear(state){
            bookmarkAdapter.removeAll(state)
        },
        fail(state){
            state.status = 'failed'
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

const selectBookmarksByRefinements = createSelector(
    [selectAll, (_, refinements:BookmarkRefinement)=>refinements],
    (bookmarks,refinements)=>{
        return bookmarks.filter(b=>{
            if(!refinements) return true
            if(b.groupId === refinements.id){
                if(refinements.colorMasks){
                    return !refinements.colorMasks.includes(b.color)
                }
                return true
            }
            return false
        } ).map(b=>b.id)
    }
)

export const useBookmarkIdsByGroup = (groupId:string) => {
    return useSelector(
        (state: { bookmarks: ReturnType<typeof bookmarkSlice.reducer> }) =>
        selectBookmarkIdsByGroup(state.bookmarks,groupId)
    )
}

export const useBookmarkIdsByRefinements = (refinements:BookmarkRefinement) => {
    return useSelector(
        (state: { bookmarks: ReturnType<typeof bookmarkSlice.reducer> }) =>
        selectBookmarksByRefinements(state.bookmarks,refinements)
    )
}


export const useBookmarksByGroup = (groupId:string) => {
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

export const useBookmarkStatus = () => {
    return useSelector(
        (state: { bookmarks: ReturnType<typeof bookmarkSlice.reducer> }) =>
        state.bookmarks.status
    )
}

export default bookmarkSlice.reducer


