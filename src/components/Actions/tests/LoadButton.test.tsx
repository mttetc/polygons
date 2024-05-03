import LoadButton from '@/components/Actions/LoadButton';
import { encodePolygonList } from '@/protobuf/polygon_pb';
import polygonsReducer from '@/store/slices/polygon';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';

describe('LoadButton Component', () => {
  it('should update store when file is loaded', async () => {
    const store = configureStore({
      reducer: {
        polygons: polygonsReducer,
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <LoadButton />
      </Provider>,
    );

    const polygonList = encodePolygonList({
      polygons: [{ id: '1', points: [1, 2, 3, 4] }],
    });

    const file = new File([polygonList], 'test.bin', {
      type: 'application/octet-stream',
    });

    const fileInput = getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      const state = store.getState();
      expect(state.polygons).toEqual([
        {
          id: '1',
          points: [1, 2, 3, 4],
        },
      ]);
    });
  });
});
