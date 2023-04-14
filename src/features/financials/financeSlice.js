import { createSlice } from "@reduxjs/toolkit";

export const financeSlice = createSlice({
    name: "finance",
    initialState: {
        incomeArr: [],
        expenseArr: [],
        savingsArr: [],
    },
    reducers: {
        // this works.
        addIncome(state, action) {
            state.incomeArr.push(action.payload);
        },

        deleteIncome(state, action) {
            state.incomeArr = action.payload;
        },

        addExpense(state, action) {
            state.expenseArr.push(action.payload);
        },

        deleteExpense(state, action) {
            state.expenseArr = action.payload;
        },

    }
});



export const { addIncome, deleteIncome, addExpense } = financeSlice.actions;


export default financeSlice.reducer;