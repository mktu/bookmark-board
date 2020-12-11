import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import sidebarSlice from '../modules/sidebarSlice'
import profileSlice from '../modules/profileSlice'
import groupSlice from '../modules/groupSlice'
import bookmarkSlice from '../modules/bookmarkSlice'
import usersSlice from '../modules/usersSlice'
import commentSlice from '../modules/commentSlice'
import requestSlice from '../modules/requestSlice'

const rootReducer = combineReducers({
    sidebar : sidebarSlice,
    profile : profileSlice,
    groups : groupSlice,
    bookmarks : bookmarkSlice,
    users : usersSlice,
    comments : commentSlice,
    requests : requestSlice
})

const store = configureStore({
    reducer: rootReducer,
    middleware : (getDefaultMiddleware)=>getDefaultMiddleware().concat(thunkMiddleware)
})

export type RootReducer = ReturnType<typeof rootReducer>

export default store;
