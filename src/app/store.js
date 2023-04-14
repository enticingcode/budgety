import { configureStore } from "@reduxjs/toolkit";
import financeReducer from "../features/financials/financeSlice";
import expenseReducer from "../features/financials/expenseSlice";
export default configureStore({
    reducer: {
        finance: financeReducer,
        expense: expenseReducer,
    },
});
