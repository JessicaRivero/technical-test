import { configureStore } from '@reduxjs/toolkit';
import breadcrumbsReducer from '../redux/slices/breadcrumbSlice';

export const store = configureStore({
  reducer: {
    breadcrumbs: breadcrumbsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
