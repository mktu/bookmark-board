import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const editorAdapter = createEntityAdapter<Profile>()

const initialState = editorAdapter.getInitialState()

const editorSlice = createSlice({
    name: 'editors',
    initialState,
    reducers: {
        addEditors: (state, action: PayloadAction<{ editors: Profile[] }>) => {
            editorAdapter.upsertMany(state, action.payload.editors)
        },
        modifyEditors: (state, action: PayloadAction<{ editors: Profile[] }>) => {
            editorAdapter.updateMany(state, action.payload.editors.map(b => ({ id: b.id, changes: b })))
        },
        removeEditors: (state, action: PayloadAction<{ editors: Profile[] }>) => {
            editorAdapter.removeMany(state, action.payload.editors.map(b => b.id))
        },
        clear: (state) => {
            editorAdapter.removeAll(state)
        },
    },
})

export const actions = editorSlice.actions

export const {
    selectAll,
    selectIds,
    selectById,
    selectEntities
} = editorAdapter.getSelectors()

export const selectEditorsByUids = createSelector(
    [selectAll, (_, uids: string[]) => uids],
    (editors, uids) => {
        return editors.filter(b => uids.includes(b.id))
    }
)

export const useEditorsByIds = (uids: string[]) => {
    return useSelector(
        (state: { editors: ReturnType<typeof editorSlice.reducer> }) => {
            return selectEditorsByUids(state.editors, uids)
        }
    )
}

export default editorSlice.reducer