import Canvas from '@/components/Canvas';
import List from '@/components/List';
import NavBar from '@/components/NavBar';
import { Grid, useMediaQuery } from '@mui/material';

function Home() {
  const isDesktop = useMediaQuery('(min-width:900px)');

  return (
    <Grid
      height="100dvh"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      gap={{
        xs: 2,
        md: 0,
      }}
      container
      columns={4}
      wrap="nowrap"
    >
      <Grid
        item
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: { md: '0 0 180px' },
        }}
      >
        {isDesktop ? <List /> : <NavBar />}
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        <Canvas />
      </Grid>
    </Grid>
  );
}

export default Home;
