import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    household: [],
};

export const household = createSlice({
    name: 'household',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // addHousehold: (state, action) => {
        //     state.bills = action.payload.bills;
        //     state.householdId = action.payload.householdId;
        //     state.members = action.payload.members;
        // },
        // addBills: (state, action) => {
        //     state.bills = action.payload;
        // },
        addMembers: (state, action) => {
            const newMember = action.payload
            state.household.members = [
                ...state.household.members,
                newMember
            ];
        },
        // addHouseholdId: (state, action) => {
        //     state.householdId = action.payload;
        // }
        addHousehold: (state, action) => {
            state.household = action.payload;
        },

        addBill: (state, action) => {
            const newBill = action.payload;

            state.household.bills = [
                ...state.household.bills,
                newBill
            ];
        },

        addBills: (state, action) => {
            state.household.bills = action.payload;
        },
        changeBills: (state, action) => {
            state.household.bills = state.household.bills.map(bill => {
                if (bill.id === action.payload.id) {
                    bill.status = action.payload.status;
                    return bill;
                }
                return bill;
            });
        },
    },
});

export const { addBill, addMembers, addHouseholdId, addHousehold, addBills, changeBills } = household.actions;

export const selectBills = state => state.household.household.bills;
export const selectMembers = state => state.household.household.members;
export const selectHouseholdId = state => state.household.household.householdId;
export const selectHousehold = state => state.household;
export const selectTotalPrice = state => {

    if (state.household?.household.bills !== undefined) {
        let total = 0;

        state.household?.household.bills.forEach(bill => {
            total += Number(bill.amount);
        });

        return total;
    }
    return 0;
};

export const selectCompletedTotal = state => {
    if (state.household?.household.bills !== undefined) {

        let total = 0;
        state.household?.household.bills.forEach(bill => {
            if (bill.status === 'paid') {
                total += Number(bill.amount);
            }
        });

        return total;
    }

    return 0;
};

export const selectKeyCode = state => state.household.household.keyCode;

export const selectAllAssignedTrue = state => {
    let isTrue = false;
    if (state.household?.household.bills) {
        state.household?.household.bills.forEach(bill => {
            if (bill.assigned !== null) {
                isTrue = true
            }
        });
    }

    return isTrue;
};




export default household.reducer;

