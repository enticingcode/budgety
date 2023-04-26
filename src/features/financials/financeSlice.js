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

        saveIncomeData(state, action) {
            state.incomeArr = action.payload;
        },

        saveExpenseData(state, action) {
            state.expenseArr = action.payload;
        },

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

        addSavings(state, action) {
            state.savingsArr.push(action.payload);
        },

        deleteSavings(state, action) {
            state.savingsArr = action.payload;
        },


    }
});



export const { saveIncomeData, saveExpenseData, addIncome, deleteIncome, addExpense, deleteExpense, addSavings, deleteSavings } = financeSlice.actions;


export default financeSlice.reducer;