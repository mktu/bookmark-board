import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const initState: Profile = {
    name: '',
    id: '',
    image: '',
}

type Payload = {
    profile: Profile
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: initState,
    reducers: {
        saveProfile: (state, action: PayloadAction<Payload>) => {
            state = action.payload.profile
            return state
        },
        clear: () => {
            return {
                name: '',
                id: '',
                image: '',
            }
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