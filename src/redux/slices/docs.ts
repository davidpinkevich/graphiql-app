import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IntrospectionInputValue } from 'graphql';

type InitialStateType = {
  currentFieldName: string;
  currentFieldArgs: Array<IntrospectionInputValue>;
  isOpen: boolean;
  history: string[];
  baseUrl: string;
};

const initialState: InitialStateType = {
  currentFieldName: 'Query',
  currentFieldArgs: [],
  isOpen: false,
  history: ['Query'],
  baseUrl: 'https://rickandmortyapi.com/graphql',
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
    setBaseUrl(state, action: PayloadAction<string>) {
      state.baseUrl = action.payload;
    },
  },
});

export const {
  setFieldName,
  setFieldArgs,
  toggleOpen,
  addToHistory,
  removeFromHistory,
  setBaseUrl,
} = slice.actions;
export default slice.reducer;
