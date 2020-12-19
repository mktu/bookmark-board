import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const requestAdapter = createEntityAdapter<BookmarkRequest>({
    sortComparer : (a,b)=>{
        return a.created - b.created
    }
})

const initialState = requestAdapter.getInitialState()

const requestSlice = createSlice({
    name : 'requests',
    initialState,
    reducers : {
        upsert(state,action : PayloadAction<BookmarkRequest[]>){
            requestAdapter.upsertMany(state, action.payload)
        },
        modify(state,action : PayloadAction<BookmarkRequest[]>){
            requestAdapter.updateMany(state, action.payload.map(b=>({id:b.id, changes : b})))
        },
        delete(state,action : PayloadAction<BookmarkRequest[]>){
            requestAdapter.removeMany(state, action.payload.map(b=>b.id))
        },
        clear(state){
            requestAdapter.removeAll(state)
        }
    }
})

export const actions = requestSlice.actions

export const {
    selectAll,
    selectIds,
    selectById,
    selectEntities
} = requestAdapter.getSelectors()

const selectRequestByGroup = createSelector(
    [selectAll, (_, groupId:string)=>groupId],
    (requests,groupId)=>{
        return requests.filter(r=>r.groupId===groupId)
    }
)

const selectRequestByGroups = createSelector(
    [selectAll, (_, groupIds:string[])=>groupIds],
    (requests,groupIds)=>{
        return requests.filter(r=>groupIds.includes(r.groupId))
    }
)

const selectRequestIdsByGroups = createSelector(
    [selectAll, (_, groupIds:string[])=>groupIds],
    (requests,groupIds)=>{
        return requests.filter(r=>groupIds.includes(r.groupId)).map(r=>r.id)
    }
)

export const useRequestsByGroup = (groupId:string) => {
    return useSelector(
        (state: { requests: ReturnType<typeof requestSlice.reducer> }) =>
        selectRequestByGroup(state.requests,groupId)
    )
}

export const useRequestsByGroups = (groupIds:string[]) => {
    return useSelector(
        (state: { requests: ReturnType<typeof requestSlice.reducer> }) =>
        selectRequestByGroups(state.requests,groupIds)
    )
}

export const useRequestIdsByGroups = (groupIds:string[]) =>{
    return useSelector(
        (state: { requests: ReturnType<typeof requestSlice.reducer> }) =>
        selectRequestIdsByGroups(state.requests,groupIds)
    )
}

export default requestSlice.reducer