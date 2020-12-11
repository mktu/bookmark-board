import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const userAdapter = createEntityAdapter<Profile>()

const initialState = userAdapter.getInitialState()

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        upsertUsers: (state, action: PayloadAction<{ users: Profile[] }>) => {
            userAdapter.upsertMany(state, action.payload.users)
        },
        modifyUsers: (state, action: PayloadAction<{ users: Profile[] }>) => {
            userAdapter.updateMany(state, action.payload.users.map(b => ({ id: b.id, changes: b })))
        },
        removeUsers: (state, action: PayloadAction<{ users: Profile[] }>) => {
            userAdapter.removeMany(state, action.payload.users.map(b => b.id))
        },
        clear: (state) => {
            userAdapter.removeAll(state)
        },
    },
})

export const actions = userSlice.actions

export const {
    selectAll,
    selectIds,
    selectById,
    selectEntities
} = userAdapter.getSelectors()

const selectUsersByUids = createSelector(
    [selectAll, (_, uids: string[]) => uids],
    (users, uids) => {
        return users.filter(b => uids.includes(b.id))
    }
)

const selectUserIdsByUids = createSelector(
    [selectAll, (_, uids: string[]) => uids],
    (users, uids) => {
        return users.filter(b => uids.includes(b.id)).map(v=>v.id)
    }
)

export const useUsersByIds = (uids: string[]) => {
    return useSelector(
        (state: { users: ReturnType<typeof userSlice.reducer> }) => {
            return selectUsersByUids(state.users, uids)
        }
    )
}

export const useUserById = (uid: string) => {
    return useSelector(
        (state: { users: ReturnType<typeof userSlice.reducer> }) => {
            return selectById(state.users, uid)
        }
    )
}

export const useUserIdsByIds = (uids: string[]) => {
    return useSelector(
        (state: { users: ReturnType<typeof userSlice.reducer> }) => {
            return selectUserIdsByUids(state.users, uids)
        }
    )
}


export default userSlice.reducer