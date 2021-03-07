import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const groupRefinementAdapter = createEntityAdapter<BookmarkRefinement>()

const initialState = groupRefinementAdapter.getInitialState()

const groupRefinementSlice = createSlice({
    name: 'groupRefinements',
    initialState,
    reducers: {
        addRefinements: (state, action : PayloadAction<{refinements:BookmarkRefinement[]}>) => {
            groupRefinementAdapter.upsertMany(state,action.payload.refinements)
        },
        modifyGroups: (state, action : PayloadAction<{refinements:BookmarkRefinement[]}>) => {
            groupRefinementAdapter.updateMany(state,action.payload.refinements.map(b=>({id:b.id, changes : b})))
        },
        removeGroups: (state, action : PayloadAction<{refinements:BookmarkRefinement[]}>) => {
            groupRefinementAdapter.removeMany(state, action.payload.refinements.map(b=>b.id))
        },
        clear: (state) => {
            groupRefinementAdapter.removeAll(state)
        },
    },
})

export const actions = groupRefinementSlice.actions

export const {
    selectAll,
    selectIds,
    selectById,
    selectEntities
} = groupRefinementAdapter.getSelectors()


export const useRefinementById = (groupId:string) => {
    return useSelector(
        (state: { groupRefinements: ReturnType<typeof groupRefinementSlice.reducer> }) =>
        selectById(state.groupRefinements,groupId)
    )
}

export default groupRefinementSlice.reducer