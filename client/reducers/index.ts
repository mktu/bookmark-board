import { combineReducers } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import sidebarSlice from '../modules/sidebarSlice'
import serviceSlice from '../modules/serviceSlice'
import profileSlice from '../modules/profileSlice'

const rootReducer = combineReducers({
    sidebar : sidebarSlice,
    service : serviceSlice,
    profile : profileSlice
})

const store = configureStore({
    reducer: rootReducer,
    middleware : (getDefaultMiddleware)=>getDefaultMiddleware().concat(thunkMiddleware)
})

export type RootReducer = ReturnType<typeof rootReducer>

export default store;
