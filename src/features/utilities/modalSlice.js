import {createSlice} from "@reduxjs/toolkit";

// This modalSlice will have to both activate and decide which cash module category it will use
// This is due to our modal pop up being rendered and called in RouteSwitch.js.
// I hate this setup but I'm sure it'll work for my case temporarily.

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isActive: false,
        category: "",
    },
    reducers: {
        isModalActive(state, action) {
            console.log(action.payload)
            state.isActive = action.payload.isActive;
            state.category = action.payload.category;
        }
    }
});


export const {isModalActive} = modalSlice.actions;

export default modalSlice.reducer;