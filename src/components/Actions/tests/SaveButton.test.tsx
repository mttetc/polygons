import SaveButton from '@/components/Actions/SaveButton';
import polygonsReducer from '@/store/slices/polygon';
import { RootState } from '@/store/types';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/store/hooks', () => ({
  useAppSelector: (selector: (value: RootState) => void) =>
    selector({
      polygons: [
        { id: '1', points: [1, 1, 3, 1, 3, 3, 1, 3], isSelected: true },
        { id: '2', points: [2, 0, 4, 0, 4, 4, 2, 4], isSelected: false },
      ],
    }),
}));

global.URL.createObjectURL = vi.fn();
global.URL.revokeObjectURL = vi.fn();

describe('SaveButton Component', () => {
  const store = configureStore({
    reducer: {
      polygons: polygonsReducer,
    },
    preloadedState: {
      polygons: [
        { id: '1', points: [1, 1, 3, 1, 3, 3, 1, 3], isSelected: true },
        { id: '2', points: [2, 0, 4, 0, 4, 4, 2, 4], isSelected: false },
      ],
    },
  });

  it('should save selected polygons when clicked', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SaveButton />
      </Provider>,
    );

    const saveButton = getByTestId('save-button');
    fireEvent.click(saveButton);

    const mockBlob = vi.fn();
    global.Blob = mockBlob;

    const mockCreateObjectURL = vi.fn();
    global.URL.createObjectURL = mockCreateObjectURL;

    // Simulate another click to test if download works
    fireEvent.click(saveButton);

    expect(mockBlob).toHaveBeenCalledWith(
      expect.arrayContaining([expect.any(Uint8Array)]),
      {
        type: 'application/octet-stream',
      },
    );

    expect(mockCreateObjectURL).toHaveBeenCalled();
  });
});
