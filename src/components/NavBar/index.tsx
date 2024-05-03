import { Menu, MenuOpen } from '@mui/icons-material';
import { AppBar, Drawer, IconButton, Toolbar } from '@mui/material';
import { useState } from 'react';
import List from '@/components/List';

const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleToggleDrawer}
        >
          {isDrawerOpen ? <MenuOpen /> : <Menu />}
        </IconButton>
      </Toolbar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={handleToggleDrawer}>
        <List />
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
