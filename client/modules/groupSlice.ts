import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const groupAdapter = createEntityAdapter<BookmarkGroup>({
    sortComparer : (a,b)=>{
        return a.idx - b.idx
    }
})

const initialState = groupAdapter.getInitialState()

const groupSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        addGroups: (state, action : PayloadAction<{groups:BookmarkGroup[]}>) => {
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

export const selectGroupByUser = createSelector(
    [selectAll, (_, uid:string)=>uid],
    (groups,uid)=>{
        return groups.filter(b=>b.users.includes(uid))
    }
)

export const useGroupsByUser = (uid:string) => {
    return useSelector(
        (state: { groups: ReturnType<typeof groupSlice.reducer> }) =>
        selectGroupByUser(state.groups,uid)
    )
}

export const useGroupById = (groupId:string) => {
    return useSelector(
        (state: { groups: ReturnType<typeof groupSlice.reducer> }) =>
        selectById(state.groups,groupId)
    )
}

export default groupSlice.reducer