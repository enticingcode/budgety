import { createSlice } from "@reduxjs/toolkit";

export const financialsSlice = createSlice({
    name: "financials",
    initialState: {
        value: 'hiTest',
    },
    reducers: {
        testFunc: (state) => {
            console.log(state);
        },
    }
});

export const { testFunc } = financialsSlice.actions

export default financialsSlice.reducer;