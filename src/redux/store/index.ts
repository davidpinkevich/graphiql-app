import { configureStore } from '@reduxjs/toolkit';
import DocsReducer from '../slices/docs';
import editor from '../slices/editor';
import authSlice from '../slices/auth';

const store = configureStore({
  reducer: {
    docs: DocsReducer,
    editor,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
