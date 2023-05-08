import { configureStore } from '@reduxjs/toolkit';
import DocsReducer from '../slices/docs';

const store = configureStore({
  reducer: {
    docs: DocsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
