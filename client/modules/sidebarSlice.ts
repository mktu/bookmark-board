import { createSlice } from '@reduxjs/toolkit'

const sidebarSlice = createSlice({
    name : 'sidebar',
    initialState: true,
    reducers : {
        toggleSideBar : (state) => !state
    }
})

export const { toggleSideBar } = sidebarSlice.actions
export default sidebarSlice.reducer