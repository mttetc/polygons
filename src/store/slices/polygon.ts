import { Polygon } from '@/protobuf/polygon_pb';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Polygon[] = [];

export const polygonsSlice = createSlice({
  name: 'polygons',
  initialState,
  reducers: {
    addPolygon: (state, action: PayloadAction<Polygon>) => {
      state.push(action.payload);
    },
    removePolygon: (state, action: PayloadAction<string>) => {
      return state.filter((polygon) => polygon.id !== action.payload);
    },
    replacePolygons: (_, action: PayloadAction<Polygon[]>) => {
      return action.payload;
    },
    togglePolygon: (state, action: PayloadAction<Polygon['id']>) => {
      const polygon = state.find((polygon) => polygon.id === action.payload);
      if (polygon) {
        polygon.isSelected = !polygon.isSelected;
      }
    },
  },
});

export const { addPolygon, removePolygon, togglePolygon, replacePolygons } =
  polygonsSlice.actions;

export default polygonsSlice.reducer;
