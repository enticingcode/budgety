import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        value: {},
    },

    reducers: {
        expenseTest(state) {
            state.value.hello = "hello";
        }
    }
});

export const { expenseTest } = expenseSlice.actions;
export default expenseSlice.reducer;
