import { configureStore } from '@reduxjs/toolkit';
import polygons from '@/store/slices/polygon';

export const store = configureStore({
  reducer: {
    polygons,
  },
});
