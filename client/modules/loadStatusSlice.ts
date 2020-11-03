import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const loadStatusAdapter = createEntityAdapter<LoadStatus>()

const initialState = loadStatusAdapter.getInitialState()

const loadStatusSlice = createSlice({
    name : 'loadstatus',
    initialState,
    reducers : {
        onLoad(state,action : PayloadAction<string>){
            loadStatusAdapter.upsertOne(state, {
                id : action.payload,
                status : 'loading'
            })
        },
        onLoaded(state,action : PayloadAction<string>){
            loadStatusAdapter.updateOne(state, {
                id : action.payload,
                changes : {
                    status : 'loaded'
                }
            })
        },
        onFailed(state,action : PayloadAction<string>){
            loadStatusAdapter.updateOne(state, {
                id : action.payload,
                changes : {
                    status : 'failed'
                }
            })
        },
        onUnload(state,action : PayloadAction<string>){
            loadStatusAdapter.removeOne(state, action.payload)
        },
    }
})

export const actions = loadStatusSlice.actions

export const {
    selectAll,
    selectIds,
    selectById,
    selectEntities
} = loadStatusAdapter.getSelectors()


export const useLoadStatus = (id:string) => {
    return useSelector(
        (state: { loadstatus: ReturnType<typeof loadStatusSlice.reducer> }) =>
        selectById(state.loadstatus,id)
    )
}

export default loadStatusSlice.reducer