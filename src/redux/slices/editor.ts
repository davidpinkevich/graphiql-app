import { createSlice } from '@reduxjs/toolkit';
import { TInitialStateEditor } from '../../types';

const initialState: TInitialStateEditor = {
  textMain: '',
  textVariables: '',
  textHeaders: '',
  hiddenSide: false,
  chooseBtn: true,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    getMainText: (state, action) => {
      state.textMain = action.payload;
    },
    getVariablesText: (state, action) => {
      state.textVariables = action.payload;
    },
    getHeadersText: (state, action) => {
      state.textHeaders = action.payload;
    },
    hiddenSidebar: (state, action) => {
      state.hiddenSide = action.payload;
    },
    activeBtn: (state, action) => {
      state.chooseBtn = action.payload;
    },
  },
});

const { actions, reducer } = editorSlice;

export default reducer;

export const { getMainText, getVariablesText, getHeadersText, hiddenSidebar, activeBtn } = actions;
