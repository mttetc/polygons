import List from '@/components/List';
import polygonsReducer from '@/store/slices/polygon';
import { RootState } from '@/store/types';
import { Store, configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it } from 'vitest';

describe('List Component', () => {
  let store: Store<RootState>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        polygons: polygonsReducer,
      },
      preloadedState: {
        polygons: [
          {
            id: '1',
            name: 'Polygon 1',
            points: [1, 1, 3, 1, 3, 3, 1, 3],
            isSelected: false,
          },
          {
            id: '2',
            name: 'Polygon 2',
            points: [2, 0, 4, 0, 4, 4, 2, 4],
            isSelected: false,
          },
        ],
      },
    });
  });

  it('should toggle polygon selection when list item is clicked', async () => {
    const { getByRole } = render(
      <Provider store={store}>
        <List />
      </Provider>,
    );

    const listItemButton = getByRole('button', { name: 'Polygon 1' });
    fireEvent.click(listItemButton);

    await waitFor(() => {
      const updatedPolygon = store
        .getState()
        .polygons.find((p) => p.id === '1');
      expect(updatedPolygon?.isSelected).toBe(true);
    });

    fireEvent.click(listItemButton);

    await waitFor(() => {
      const updatedPolygon = store
        .getState()
        .polygons.find((p) => p.id === '1');
      expect(updatedPolygon?.isSelected).toBe(false);
    });
  });
});
