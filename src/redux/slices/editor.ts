import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request, gql } from 'graphql-request';
import { TInitialStateEditor, TResponse } from '../../types';

const initialState: TInitialStateEditor = {
  textMain: '',
  textVariables: '',
  textHeaders: '',
  hiddenSide: false,
  chooseBtn: true,
  loadingData: 'start',
  response: '',
  timeResponse: 0,
  postRequestClick: false,
};

export const getData = createAsyncThunk('editor/getData', async (data: TResponse) => {
  const query = gql`
    ${data.query}
  `;
  const variables = data.variables ? data.variables : '';
  const headers = data.headers ? data.headers : '';
  if (data.variables && !data.headers) {
    return await request(data.url, query, JSON.parse(variables));
  } else if (!data.variables && data.headers) {
    return await request(data.url, query, JSON.parse(headers));
  } else if (data.variables && data.headers) {
    return await request(data.url, query, JSON.parse(variables), JSON.parse(headers));
  } else {
    return await request(data.url, query);
  }
});

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
    clearResponse: (state) => {
      state.response = '';
    },
    changeLoading: (state) => {
      state.loadingData = 'start';
    },
    getTimeResponse: (state, action) => {
      state.timeResponse = action.payload;
    },
    clickRequest: (state, action) => {
      state.postRequestClick = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loadingData = 'loading';
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.loadingData = 'start';
        state.response = JSON.stringify(action.payload);
      })
      .addCase(getData.rejected, (state) => {
        state.loadingData = 'error';
      });
  },
});

const { actions, reducer } = editorSlice;

export default reducer;

export const {
  getMainText,
  getVariablesText,
  getHeadersText,
  hiddenSidebar,
  activeBtn,
  clearResponse,
  changeLoading,
  getTimeResponse,
  clickRequest,
} = actions;
