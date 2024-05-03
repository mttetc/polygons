import Canvas from '@/components/Canvas';
import { useDrawing } from '@/hooks/useDrawing';
import polygonsReducer from '@/store/slices/polygon';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MockedFunction, vi } from 'vitest';

vi.mock('canvas');
vi.mock('@/hooks/useDrawing');
vi.mock('react-konva', () => ({
  Stage: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Layer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Line: () => <div />,
}));

describe('Canvas Component', () => {
  it('should call handleMouseDown when canvas is clicked', () => {
    const handleMouseDown = vi.fn(); // Mocked function to track calls

    const mockUseDrawingReturnValue: ReturnType<typeof useDrawing> = {
      isDrawing: false,
      points: [],
      handleMouseDown,
      handleMouseMove: vi.fn(),
      handleMouseUp: vi.fn(),
      handleMouseLeave: vi.fn(),
      handleTouchStart: vi.fn(),
      handleTouchMove: vi.fn(),
    };

    (useDrawing as MockedFunction<typeof useDrawing>).mockReturnValue(
      mockUseDrawingReturnValue,
    );

    const store = configureStore({
      reducer: {
        polygons: polygonsReducer,
      },
      preloadedState: {
        polygons: [],
      },
    });

    const { getByRole } = render(
      <Provider store={store}>
        <Canvas />
      </Provider>,
    );
  });
});
