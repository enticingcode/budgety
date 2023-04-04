import { createSlice } from "@reduxjs/toolkit";

export const incomeSlice = createSlice({
    name: "income",
    initialState: {
        value: [],
    },
    reducers: {
        addItem(state) {
            console.log('hi');
        },

    }
});

export const { addItem } = incomeSlice.actions

export default incomeSlice.reducer;