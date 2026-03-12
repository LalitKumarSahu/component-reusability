// src/components/Header.js
import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './header.css';

const drawerWidth = 240;

function Header(props) {
  const { window } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawer = (
    <Box className="drawer-content">
      <div className="drawer-header">
        <Typography
          variant="h6"
          className="drawer-logo"
          onClick={() => handleNavigate('/')}
          style={{ cursor: 'pointer' }}
        >
          ReUseIt
        </Typography>
      </div>
      <Divider className="drawer-divider" />
      <List className="drawer-list">
        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => handleNavigate('/about')}
            className="drawer-button"
          >
            <ListItemText primary="About" className="drawer-text" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => handleNavigate('/contact')}
            className="drawer-button"
          >
            <ListItemText primary="Contact" className="drawer-text" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="static" className="modern-header" color="transparent" enableColorOnDark>
        <Toolbar className="header-toolbar">
          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            className="header-title"
            onClick={() => handleNavigate('/')}
          >
            ReUseIt
          </Typography>

          {/* Desktop buttons */}
          <Box className="header-actions">
            <Button className="header-btn" onClick={() => handleNavigate('/about')}>
              About
            </Button>
            <Button className="header-btn" onClick={() => handleNavigate('/contact')}>
              Contact
            </Button>
          </Box>

          {/* Mobile menu button */}
          <IconButton
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            className="mobile-menu-btn"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        className="mobile-drawer"
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer */}
      <Box component="main">
        <Toolbar className="header-spacer" />
      </Box>
    </Box>
  );
}

Header.propTypes = {
  window: PropTypes.func,
};

export default Header;