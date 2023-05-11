import { configureStore } from '@reduxjs/toolkit';
import DocsReducer from '../slices/docs';
import editor from '../slices/editor';

const store = configureStore({
  reducer: {
    docs: DocsReducer,
    editor,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
