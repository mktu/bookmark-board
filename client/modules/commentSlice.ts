import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const commentAdapter = createEntityAdapter<BookmarkComment>({
    sortComparer : (a,b)=>{
        return a.created - b.created
    }
})

const initialState = commentAdapter.getInitialState()

const commentSlice = createSlice({
    name : 'comments',
    initialState,
    reducers : {
        upsert(state,action : PayloadAction<BookmarkComment[]>){
            commentAdapter.upsertMany(state, action.payload)
        },
        modify(state,action : PayloadAction<BookmarkComment[]>){
            commentAdapter.updateMany(state, action.payload.map(b=>({id:b.id, changes : b})))
        },
        delete(state,action : PayloadAction<BookmarkComment[]>){
            commentAdapter.removeMany(state, action.payload.map(b=>b.id))
        },
    }
})

export const actions = commentSlice.actions

export const {
    selectAll,
    selectIds,
    selectById,
    selectEntities
} = commentAdapter.getSelectors()

const selectCommentsByGroup = createSelector(
    [selectAll, (_, groupId:string)=>groupId],
    (comments,groupId)=>{
        return comments.filter(b=>b.groupId===groupId)
    }
)

export const useCommentsByGroup = (groupId:string) => {
    return useSelector(
        (state: { comments: ReturnType<typeof commentSlice.reducer> }) =>
        selectCommentsByGroup(state.comments,groupId)
    )
}

export default commentSlice.reducer