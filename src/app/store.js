import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/counter/userSlice';
import householdReducer from '../features/counter/householdSlice';
import householdIdSlice from '../features/counter/householdIdSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    household: householdReducer,
    householdId: householdIdSlice,
  },
});
