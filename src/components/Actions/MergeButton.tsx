import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { mergePolygons } from '@/store/thunks/mergePolygons';
import { pointsToPairs } from '@/utils';
import { Button } from '@mui/material';
import * as polyclip from 'polyclip-ts';

function MergeButton() {
  const dispatch = useAppDispatch();
  const polygons = useAppSelector((state) => state.polygons);
  const selectedPolygons = polygons.filter((polygon) => polygon.isSelected);

  const hasIntersectingPolygons = selectedPolygons.some((polygonA, indexA) =>
    selectedPolygons.some((polygonB, indexB) => {
      if (indexA !== indexB) {
        const polyA = [pointsToPairs(polygonA.points)];
        const polyB = [pointsToPairs(polygonB.points)];
        const intersection = polyclip.intersection(polyA, polyB);
        return intersection.length > 0;
      }
      return false;
    }),
  );

  const isButtonDisabled =
    !hasIntersectingPolygons || selectedPolygons.length === 0;

  const handleButtonClick = () => {
    console.log('jey');
    dispatch(mergePolygons(selectedPolygons));
  };

  return (
    <Button
      onClick={handleButtonClick}
      disabled={isButtonDisabled}
      size="small"
      variant="outlined"
      data-testid="merge-button"
    >
      Merge selected polygons
    </Button>
  );
}

export default MergeButton;
