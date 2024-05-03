import { useResponsiveDimensions } from '@/hooks/useDimensions';
import { useDrawing } from '@/hooks/useDrawing';
import { useAppSelector } from '@/store/hooks';
import { Box } from '@mui/material';
import { Layer, Line, Stage, Text } from 'react-konva';
import '@/components/Canvas/canvas.css';

function Canvas() {
  const { ref, dimensions } = useResponsiveDimensions();
  const polygons = useAppSelector((state) => state.polygons);

  const {
    points,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
  } = useDrawing();

  const placeholderText = 'Draw something!';

  return (
    <Box
      ref={ref}
      sx={{ height: '100%', width: '100%' }}
      data-testid="canvas-container"
    >
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <Layer>
          {polygons.length === 0 && (
            <Text
              text={placeholderText}
              x={dimensions.width / 2}
              y={dimensions.height / 2}
              offsetX={placeholderText.length}
              align="center"
              verticalAlign="middle"
            />
          )}
          {polygons.map((polygon) => (
            <Line
              draggable
              key={polygon.id}
              points={polygon.points}
              stroke={polygon.isSelected ? 'red' : 'black'}
            />
          ))}
          <Line points={points} stroke="black" />
        </Layer>
      </Stage>
    </Box>
  );
}

export default Canvas;
