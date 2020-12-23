import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const groupAdapter = createEntityAdapter<BookmarkGroup>({
    sortComparer : (a,b)=>{
        return a.idx - b.idx
    }
})

const initialState = groupAdapter.getInitialState<{
    status : LoadStatus['status']
}>({
    status : 'loading'
})

const groupSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        addGroups: (state, action : PayloadAction<{groups:BookmarkGroup[]}>) => {
            state.status = 'loaded'
            groupAdapter.upsertMany(state,action.payload.groups)
        },
        modifyGroups: (state, action : PayloadAction<{groups:BookmarkGroup[]}>) => {
            groupAdapter.updateMany(state,action.payload.groups.map(b=>({id:b.id, changes : b})))
        },
        removeGroups: (state, action : PayloadAction<{groups:BookmarkGroup[]}>) => {
            groupAdapter.removeMany(state, action.payload.groups.map(b=>b.id))
        },
        clear: (state) => {
            groupAdapter.removeAll(state)
        },
    },
})

export const actions = groupSlice.actions

export const {
    selectAll,
    selectIds,
    selectById,
    selectEntities
} = groupAdapter.getSelectors()

const selectGroupByUser = createSelector(
    [selectAll, (_, uid:string)=>uid],
    (groups,uid)=>{
        return groups.filter(b=>b.users.includes(uid))
    }
)

const selectGroupByOwner = createSelector(
    [selectAll, (_, uid:string)=>uid],
    (groups,uid)=>{
        return groups.filter(b=>b.owner===uid)
    }
)

export const useGroupsByUser = (uid:string) => {
    return useSelector(
        (state: { groups: ReturnType<typeof groupSlice.reducer> }) =>
        selectGroupByUser(state.groups,uid)
    )
}

export const useGroupsByOwner = (uid:string) => {
    return useSelector(
        (state: { groups: ReturnType<typeof groupSlice.reducer> }) =>
        selectGroupByOwner(state.groups,uid)
    )
}

export const useGroupById = (groupId:string) => {
    return useSelector(
        (state: { groups: ReturnType<typeof groupSlice.reducer> }) =>
        selectById(state.groups,groupId)
    )
}

export const useGroupStatus = () => {
    return useSelector(
        (state: { groups: ReturnType<typeof groupSlice.reducer> }) =>
        state.groups.status
    )
}

export default groupSlice.reducer