import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IntrospectionInputValue } from 'graphql';

type InitialStateType = {
  currentFieldName: string;
  currentFieldArgs: Array<IntrospectionInputValue>;
};

const initialState: InitialStateType = {
  currentFieldName: 'Query',
  currentFieldArgs: [],
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
  },
});

export const { setFieldName, setFieldArgs } = slice.actions;
export default slice.reducer;
