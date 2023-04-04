import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "../features/financials/incomeSlice";
import expenseReducer from "../features/financials/expenseSlice";
export default configureStore({
    reducer: {
        income: incomeReducer,
        expense: expenseReducer,
    },
});
