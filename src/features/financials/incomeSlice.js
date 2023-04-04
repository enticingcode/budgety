import { createSlice } from "@reduxjs/toolkit";

export const incomeSlice = createSlice({
    name: "income",
    initialState: {
        value: [],
    },
    reducers: {
        addItem(state) {
            
        },

        // this works.
        incomeTest(state) {
            state.value.push('hi')
        },

    }
});



export const { addItem, incomeTest } = incomeSlice.actions;


export default incomeSlice.reducer;