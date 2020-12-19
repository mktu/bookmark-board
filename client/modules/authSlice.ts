import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const initState: AuthState = {
    authState : 'loading',
    profileState : 'loading',
    uid : ''
}


const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        authSucceeded: (state, action: PayloadAction<string>) => {
            state.uid = action.payload
            state.authState = 'loaded'
            return state
        },
        authFailed: (state)=>{
            state.uid=''
            state.authState='failed'
            state.profileState='loading'
            return state
        },
        registerSucceeded: (state) => {
            state.profileState = 'loaded'
            return state
        },
        registerFailed: (state) => {
            state.profileState = 'failed'
            return state
        },
        clear : () => {
            return initState
        }
    },
})

export const actions = authSlice.actions

export const useAuthState = () => {
    return useSelector(
        (state: { auth: ReturnType<typeof authSlice.reducer> }) =>
            state.auth,
    )
}

export default authSlice.reducer