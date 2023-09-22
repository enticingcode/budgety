import { createSlice, current } from "@reduxjs/toolkit";
import { arrayRemove } from "firebase/firestore";
import { PageItem } from "react-bootstrap";

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

        addIncome(state, action) {

            state.incomeArr = [...state.incomeArr, action.payload];
            // state.incomeArr.push(action.payload);
        },
        
        deleteIncome(state, action) {
            state.incomeArr = action.payload;
        },


        // Need to filter out item object based on key to replace it.
        editIncome(state, action) {
            // state.incomeArr = [...state.incomeArr, action.payload];
             state.incomeArr = state.incomeArr.map((item) => {
                if(item.id !== action.payload.id) {
                    return item
                }
                return {
                    ...item,
                    ...action.payload
                }
                // console.log(current(item));
            })
            // console.log([...state.incomeArr, action.payload])
            // state.incomeArr = [...state, action.payload]
        },


        saveExpenseData(state, action) {
            state.expenseArr = action.payload;
        },

        addExpense(state, action) {
            state.expenseArr = [...state.expenseArr, action.payload];
        },

        deleteExpense(state, action) {
            state.expenseArr = action.payload;
        },

        
        saveSavingsData(state, action) {
            state.savingsArr = action.payload;
        },

        addSavings(state, action) {
            state.savingsArr = [...state.savingsArr, action.payload];
        },
        
        deleteSavings(state, action) {
            state.savingsArr = action.payload;
        },

    }
});



export const { saveIncomeData, addIncome, deleteIncome, editIncome, saveExpenseData, addExpense, deleteExpense, saveSavingsData, addSavings, deleteSavings } = financeSlice.actions;


export default financeSlice.reducer;