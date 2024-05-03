import polygonsReducer from '@/store/slices/polygon';
import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { describe, it } from 'vitest';
import { useDrawing } from '@/hooks/useDrawing';

describe('useDrawing', () => {
  it('should handle drawing state', () => {
    const store = configureStore({
      reducer: {
        polygons: polygonsReducer,
      },
    });

    const wrapper = ({ children }: PropsWithChildren) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useDrawing(), { wrapper });

    expect(result.current.isDrawing).toBe(false);

    act(() => {
      result.current.handleMouseDown({
        target: {
          getStage: () => ({
            getPointerPosition: () => ({ x: 1, y: 1 }),
          }),
        },
      } as never);
    });

    expect(result.current.isDrawing).toBe(true);

    act(() => {
      result.current.handleMouseUp();
    });

    expect(result.current.isDrawing).toBe(false);
  });
});
