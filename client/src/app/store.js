import { configureStore } from "@reduxjs/toolkit";
import financeReducer from "../features/financials/financeSlice";
import modalReducer from "../features/utilities/modalSlice"
import selectReducer from "../features/utilities/selectItems"
export default configureStore({
    reducer: {
        finance: financeReducer,
        modal: modalReducer,
        selectItems: selectReducer,
    },
});
