import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IntrospectionInputValue } from 'graphql';

type InitialStateType = {
  currentFieldName: string;
  currentFieldArgs: Array<IntrospectionInputValue>;
  isOpen: boolean;
};

const initialState: InitialStateType = {
  currentFieldName: 'Query',
  currentFieldArgs: [],
  isOpen: false,
};

const slice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    setFieldName(state, action: PayloadAction<string>) {
      state.currentFieldName = action.payload;
    },
    setFieldArgs(state, action: PayloadAction<Array<IntrospectionInputValue>>) {
      state.currentFieldArgs = action.payload;
    },
    toggleOpen(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setFieldName, setFieldArgs, toggleOpen } = slice.actions;
export default slice.reducer;
