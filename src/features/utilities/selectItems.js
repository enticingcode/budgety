import { createSlice } from "@reduxjs/toolkit";

export const selectItems = createSlice({
    name: "selectItems",
    initialState: {
        isSelectActive: false,
        itemsToEdit: [],
    },
    reducers: {
        select(state, action) {
        }
    }
});


export const { select } = selectItems.actions;

export default selectItems.reducer;