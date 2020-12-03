import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import sidebarSlice from '../modules/sidebarSlice'
import serviceSlice from '../modules/serviceSlice'
import profileSlice from '../modules/profileSlice'
import groupSlice from '../modules/groupSlice'
import bookmarkSlice from '../modules/bookmarkSlice'
import editorsSlice from '../modules/editorsSlice'

const rootReducer = combineReducers({
    sidebar : sidebarSlice,
    service : serviceSlice,
    profile : profileSlice,
    groups : groupSlice,
    bookmarks : bookmarkSlice,
    editors : editorsSlice
})

const store = configureStore({
    reducer: rootReducer,
    middleware : (getDefaultMiddleware)=>getDefaultMiddleware().concat(thunkMiddleware)
})

export type RootReducer = ReturnType<typeof rootReducer>

export default store;
