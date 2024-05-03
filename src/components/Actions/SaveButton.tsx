import { encodePolygonList } from '@/protobuf/polygon_pb';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@mui/material';

function SaveButton() {
  const polygons = useAppSelector((state) => state.polygons);
  const selectedPolygons = polygons.filter((polygon) => polygon.isSelected);

  const handleSaveSelectedPolygons = async () => {
    const data = encodePolygonList({ polygons: selectedPolygons });

    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'polygon.bin';
    link.click();

    // Wait for the download to finish before revoking the URL
    await new Promise((resolve) => setTimeout(resolve));

    URL.revokeObjectURL(url);
  };

  return (
    <Button
      disabled={!selectedPolygons.length}
      onClick={handleSaveSelectedPolygons}
      size="small"
      variant="outlined"
      data-testid="save-button"
    >
      Save selected polygons
    </Button>
  );
}

export default SaveButton;
