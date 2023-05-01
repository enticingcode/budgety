import { configureStore } from "@reduxjs/toolkit";
import financeReducer from "../features/financials/financeSlice";
import modalReducer from "../features/utilities/modalSlice"
export default configureStore({
    reducer: {
        finance: financeReducer,
        modal: modalReducer
    },
});
