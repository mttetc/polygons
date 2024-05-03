import MergeButton from '@/components/Actions/MergeButton';
import polygonsReducer from '@/store/slices/polygon';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@reduxjs/toolkit', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    nanoid: vi.fn().mockReturnValue('mockedId'),
  };
});

describe('MergeButton Component', () => {
  it('should update store when clicked', async () => {
    const store = configureStore({
      reducer: {
        polygons: polygonsReducer,
      },
      preloadedState: {
        polygons: [
          { id: '1', points: [1, 1, 3, 1, 3, 3, 1, 3], isSelected: true },
          { id: '2', points: [2, 0, 4, 0, 4, 4, 2, 4], isSelected: true },
        ],
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <MergeButton />
      </Provider>,
    );

    fireEvent.click(getByTestId('merge-button'));

    // Check if store was updated
    await waitFor(() => {
      const state = store.getState();
      expect(state.polygons).toContainEqual({
        id: 'mockedId',
        isSelected: false,
        name: 'Polygon 1',
        points: [1, 1, 2, 1, 2, 0, 4, 0, 4, 4, 2, 4, 2, 3, 1, 3, 1, 1],
      });
    });
  });
});
