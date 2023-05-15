import {createSlice} from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isActive: false,
    },
    reducers: {
        changeActiveStatus(state, action) {
            // console.log(action.payload)
            state.isActive = action.payload;
        }
    }
});


export const {changeActiveStatus} = modalSlice.actions;

export default modalSlice.reducer;