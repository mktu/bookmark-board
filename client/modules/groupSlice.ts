import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'


const groupSlice = createSlice({
    name: 'groups',
    initialState: [] as BookmarkGroup[],
    reducers: {
        addGroups: (state, action : PayloadAction<{groups:BookmarkGroup[]}>) => {
            return [...state,...action.payload.groups]
        },
        modifyGroups: (state, action : PayloadAction<{groups:BookmarkGroup[]}>) => {
            return [...state.map(v=> {
                const matched = action.payload.groups.find(v2=>v2.id===v.id)
                if(matched){
                    return matched
                }
                return v
            })]
        },
        removeGroups: (state, action : PayloadAction<{groups:BookmarkGroup[]}>) => {
            return state.filter(v => action.payload.groups.map(v=>v.id).includes(v.id) )
        },
        clear: () => {
            return []
        },
    },
})

export const actions = groupSlice.actions

export const useGroups = () => {
    return useSelector(
        (state: { groups: ReturnType<typeof groupSlice.reducer> }) =>
            state.groups,
    )
}

export const selectGroupsByUser = (state:BookmarkGroup[], id:string)=>{
    return state.find(group => group.id === id)
}

export default groupSlice.reducer