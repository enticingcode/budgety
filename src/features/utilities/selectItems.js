import { createSlice } from "@reduxjs/toolkit";

export const selectItems = createSlice({
    name: "selectItems",
    initialState: {
        isSelectActive: false,
        itemsToEdit: [],
    },
    reducers: {
        select(state, action) {
           state.isSelectActive = !state.isSelectActive;
           console.log(state.isSelectActive);
        }
    }
});


export const { select } = selectItems.actions;

export default selectItems.reducer;


// Based on state of isSelectActive, 

// - True would cause div elements to become targetable by clicks/touch.
//  (this can be acheived by changing them to select elements or just making a list array of selected divs)
// 	second option is probably better considering styling preferences.

// - going with the second option.

// when isSelect is Active, elements will translate to the right and a circle styled will appear when element is clicked on/