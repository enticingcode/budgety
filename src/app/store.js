import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "../features/financials/incomeSlice"

export default configureStore({
    reducer: {
        income: incomeReducer
    },
});
