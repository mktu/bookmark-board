import { createSlice, PayloadAction, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const notificationAdapter = createEntityAdapter<UserNotification>({
    sortComparer: (a, b) => {
        return a.created - b.created
    }
})

const initialState = notificationAdapter.getInitialState()

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        upsert(state, action: PayloadAction<UserNotification[]>) {
            notificationAdapter.upsertMany(state, action.payload)
        },
        modify(state, action: PayloadAction<UserNotification[]>) {
            notificationAdapter.updateMany(state, action.payload.map(b => ({ id: b.id, changes: b })))
        },
        delete(state, action: PayloadAction<UserNotification[]>) {
            notificationAdapter.removeMany(state, action.payload.map(b => b.id))
        },
        clear(state) {
            notificationAdapter.removeAll(state)
        }
    }
})

export const actions = notificationSlice.actions

export const {
    selectAll,
    selectIds,
    selectById,
    selectEntities
} = notificationAdapter.getSelectors()

const selectUnreadNotifications = createSelector(
    [selectAll],
    (notifications) => {
        return notifications.filter(r => !r.read).sort((a,b)=>b.created-a.created)
    }
)


export const useUnreadNotifications = () => {
    return useSelector(
        (state: { notifications: ReturnType<typeof notificationSlice.reducer> }) =>
            selectUnreadNotifications(state.notifications)
    )
}

export const useNotifications = () => {
    return useSelector(
        (state: { notifications: ReturnType<typeof notificationSlice.reducer> }) =>
            selectAll(state.notifications).sort((a,b)=>b.created-a.created),
    )
}

export default notificationSlice.reducer