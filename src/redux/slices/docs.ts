import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IntrospectionInputValue } from 'graphql';

type InitialStateType = {
  currentFieldName: string;
  currentFieldArgs: Array<IntrospectionInputValue>;
  isOpen: boolean;
  history: string[];
};

const initialState: InitialStateType = {
  currentFieldName: 'Query',
  currentFieldArgs: [],
  isOpen: false,
  history: ['Query'],
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
    addToHistory(state, action: PayloadAction<string>) {
      state.history.push(action.payload);
    },
    removeFromHistory(state) {
      state.history.pop();
    },
  },
});

export const { setFieldName, setFieldArgs, toggleOpen, addToHistory, removeFromHistory } =
  slice.actions;
export default slice.reducer;
