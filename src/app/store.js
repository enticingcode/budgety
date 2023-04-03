import { configureStore } from "@reduxjs/toolkit";
import financialsReducer from "../features/financials/financialsSlice"

export default configureStore({
    reducer: {
        financials: financialsReducer
    },
});
