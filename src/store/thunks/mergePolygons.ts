import { Polygon } from '@/protobuf/polygon_pb';
import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import * as polyclip from 'polyclip-ts';
import { RootState } from '@/store/types';
import { pairsToPoints, pointsToPairs } from '@/utils';
import { addPolygon, removePolygon } from '@/store/slices/polygon';

// Create this thunk because I want the length of the polygons to be updated before I create the new one
export const mergePolygons = createAsyncThunk<void, Polygon[]>(
  'polygons/merge',
  async (selectedPolygons, { dispatch, getState }) => {
    // Convert all polygons to the format expected by polygon-clipping
    const polys = selectedPolygons.map((polygon) => [
      pointsToPairs(polygon.points),
    ]);

    // Compute the union of all the polygons
    const result = polys.reduce((acc, poly) => polyclip.union(acc, poly), []);

    // Convert the result back to the original format
    const mergedPoints = pairsToPoints(result[0][0]);

    // Remove the original polygons
    selectedPolygons.forEach((polygon) => {
      dispatch(removePolygon(polygon.id));
    });

    // Wait for the removals to be processed
    await new Promise((resolve) => setTimeout(resolve));

    // Get the updated state
    const polygons = (getState() as RootState).polygons;

    // Add the new polygon
    dispatch(
      addPolygon({
        id: nanoid(),
        name: `Polygon ${polygons.length + 1}`,
        points: mergedPoints,
        isSelected: false,
      }),
    );
  },
);
