import Actions from '@/components/Actions';
import { Polygon } from '@/protobuf/polygon_pb';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { togglePolygon } from '@/store/slices/polygon';
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemText,
  List as MuiList,
  useTheme,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { listItemVariants } from '@/components/List/consts';

function List() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const polygons = useAppSelector((state) => state.polygons);

  const handleListItemClick = (id: Polygon['id']) => () => {
    dispatch(togglePolygon(id));
  };

  return (
    <>
      <MuiList
        component="ul"
        sx={{
          flex: '1 1 auto',
          margin: 0,
          backgroundColor: theme.palette.grey[200],
          overflow: 'auto',
        }}
      >
        <ListItem>
          <ListItemText primary="Polygons" />
        </ListItem>

        {polygons.length === 0 && (
          <ListItem>
            <ListItemText
              sx={{ color: theme.palette.grey[600] }}
              primary="No polygons"
            />
          </ListItem>
        )}
        <AnimatePresence>
          {polygons.map((polygon) => (
            <motion.li
              key={polygon.id}
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              data-testid="list-item"
            >
              <ListItemButton
                selected={polygon.isSelected}
                onClick={handleListItemClick(polygon.id)}
                key={polygon.id}
              >
                <Checkbox
                  checked={polygon.isSelected}
                  inputProps={{
                    'aria-labelledby': `checkbox-list-label-${polygon.id}`,
                  }}
                  size="small"
                />
                <ListItemText primary={polygon.name} />
              </ListItemButton>
            </motion.li>
          ))}
        </AnimatePresence>
      </MuiList>
      <Actions />
    </>
  );
}

export default List;
