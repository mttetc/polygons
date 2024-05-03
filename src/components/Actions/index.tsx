import LoadButton from '@/components/Actions/LoadButton';
import MergeButton from '@/components/Actions/MergeButton';
import SaveButton from '@/components/Actions/SaveButton';
import { Stack, useTheme } from '@mui/material';
import { ComponentPropsWithoutRef } from 'react';

function Actions(props: Readonly<ComponentPropsWithoutRef<'div'>>) {
  const theme = useTheme();
  return (
    <Stack {...props} p={1} gap={1} bgcolor={theme.palette.grey[200]}>
      <LoadButton />
      <SaveButton />
      <MergeButton />
    </Stack>
  );
}

export default Actions;
