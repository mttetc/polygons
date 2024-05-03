import { useAppDispatch } from '@/store/hooks';
import { replacePolygons } from '@/store/slices/polygon';
import { Button } from '@mui/material';
import { useRef } from 'react';

import { PolygonList, decodePolygonList } from '@/protobuf/polygon_pb';

function LoadButton() {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleLoadPolygons = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.error('No file selected');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (!(result instanceof ArrayBuffer)) {
        console.error('File content is not an ArrayBuffer');
        return;
      }

      let polygonList: PolygonList | undefined;
      try {
        polygonList = decodePolygonList(new Uint8Array(result));
      } catch (error) {
        console.error('Failed to decode polygons:', error);
        return;
      }

      const { polygons } = polygonList;

      if (polygons) {
        dispatch(replacePolygons(polygons));
      } else {
        console.error('No polygons to dispatch');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Button
        onClick={handleButtonClick}
        size="small"
        variant="outlined"
        data-testid="load-button"
      >
        Load polygons
      </Button>
      <input
        type="file"
        accept=".bin"
        onChange={handleLoadPolygons}
        style={{ display: 'none' }}
        ref={fileInputRef}
        data-testid="file-input"
      />
    </>
  );
}

export default LoadButton;
