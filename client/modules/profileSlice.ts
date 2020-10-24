import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const initState: Profile = {
    name: '',
    id : '',
    image : '',
    loading : true
}

type Payload = {
    profile: Profile
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: initState,
    reducers: {
        saveProfile: (state, action : PayloadAction<Payload>) => {
            console.log(action)
            state = action.payload.profile
            state.loading = false
            return state
        },
        clear: () => {
            return initState
        },
    },
})

export const actions = profileSlice.actions

export const useProfile = () => {
    return useSelector(
        (state: { profile: ReturnType<typeof profileSlice.reducer> }) =>
            state.profile,
    )
}

export default profileSlice.reducer