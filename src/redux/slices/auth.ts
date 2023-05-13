import { createSlice } from '@reduxjs/toolkit';

type TAuthState = {
  auth: 'signin' | 'signup';
};

const initialState = {
  auth: 'signin',
} as TAuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onAuthChange: (state, action) => {
      state.auth = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;
export default reducer;
export const { onAuthChange } = actions;
