import { createSlice } from "@reduxjs/toolkit";

export const drawerSlice = createSlice({
    name: "drawer",
    initialState: {
        drawerOpen: false,
        mobileNav:false,
    },
    reducers: {
        drawerOpenTrue: (state, { payload }) => {
            state.drawerOpen = payload
        },
        drawerOpenFalse: (state, { payload }) => {
            state.drawerOpen = payload
        },
        mobileNavOpen:(state ) =>{
            state.mobileNav = true
        },
        mobileNavClose:(state) =>{
            state.mobileNav = false
        }
    }
})

export const { drawerOpenTrue, drawerOpenFalse, mobileNavOpen, mobileNavClose } = drawerSlice.actions;
export default drawerSlice.reducer;