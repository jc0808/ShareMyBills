import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    householdId: null,
};

export const householdIdSlice = createSlice({
    name: 'householdId',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        addHouseholdId: (state, action) => {
            state.householdId = action.payload;
        },

    },
});

export const { addHouseholdId } = householdIdSlice.actions;

export const selectHouseholdId = (state) => state.householdId.householdId;

export default householdIdSlice.reducer;