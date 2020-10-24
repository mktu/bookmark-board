import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const createFirebaseService = async () => {
    return {
        ...await import('../services/auth')
    }
}
type FirebaseServiceType = ReturnType<typeof createFirebaseService> extends Promise<infer T> ? T : never;

type Services = {
    firebaseServices?: FirebaseServiceType
}

type Payload = {
    mock: boolean
}

export const init: Services = {}

export const createServerSide = createAsyncThunk(
    "service/createServerSide",
    async (mock:boolean, thunkApi) => {
        if(mock){
            return;
        }
        const firebaseServices = await createFirebaseService();
        return {
            firebaseServices
        };
    }
);

const serviceSlice = createSlice({
    name: 'service',
    initialState: init,
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(createServerSide.fulfilled, (state, action) => {
            state.firebaseServices = action.payload.firebaseServices
        });
    },
})

export const useAuth = () => {
    return useSelector(
        (state: { service: ReturnType<typeof serviceSlice.reducer> }) =>
            state.service.firebaseServices,
    )
}

export const actions = serviceSlice.actions
export default serviceSlice.reducer;