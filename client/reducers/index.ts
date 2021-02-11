import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import profileSlice from '../modules/profileSlice'
import groupSlice from '../modules/groupSlice'
import bookmarkSlice from '../modules/bookmarkSlice'
import usersSlice from '../modules/usersSlice'
import commentSlice from '../modules/commentSlice'
import requestSlice from '../modules/requestSlice'
import authSlice from '../modules/authSlice'
import groupRefinementSlice from '../modules/groupRefinementSlice'

const rootReducer = combineReducers({
    profile : profileSlice,
    groups : groupSlice,
    bookmarks : bookmarkSlice,
    users : usersSlice,
    comments : commentSlice,
    requests : requestSlice,
    auth : authSlice,
    groupRefinements : groupRefinementSlice
})

const store = configureStore({
    reducer: rootReducer
})

export type RootReducer = ReturnType<typeof rootReducer>

export default store;
