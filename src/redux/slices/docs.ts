import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IntrospectionInputValue } from 'graphql';

export type FieldType = {
  name: string;
  args: Array<IntrospectionInputValue>;
};

export type InitialStateType = {
  currentFieldName: string;
  isOpen: boolean;
  history: FieldType[];
  baseUrl: string;
};

const initialState: InitialStateType = {
  currentFieldName: 'Query',
  isOpen: false,
  history: [{ name: 'Query', args: [] }],
  baseUrl: 'https://rickandmortyapi.com/graphql',
};

const slice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    setFieldName(state, action: PayloadAction<string>) {
      state.currentFieldName = action.payload;
    },
    toggleOpen(state) {
      state.isOpen = !state.isOpen;
    },
    addToHistory(state, action: PayloadAction<FieldType>) {
      if (state.history[state.history.length - 1].name !== action.payload.name) {
        state.history.push(action.payload);
      }
    },
    removeFromHistory(state) {
      state.history.pop();
    },
    setBaseUrl(state, action: PayloadAction<string>) {
      state.baseUrl = action.payload;
    },
    resetDocs(state) {
      state.currentFieldName = 'Query';
      state.history = [{ name: 'Query', args: [] }];
      state.isOpen = false;
    },
  },
});

export const {
  setFieldName,
  toggleOpen,
  addToHistory,
  removeFromHistory,
  setBaseUrl,
  resetDocs,
} = slice.actions;
export default slice.reducer;
