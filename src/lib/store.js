import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import counterReducer from './slices/counterSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      counter: counterReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};
