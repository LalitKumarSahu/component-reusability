// src/components/Header.js
import * as React from 'react';
import PropTypes from 'prop-types';
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
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './header.css'; // Import the header-specific styles

const drawerWidth = 240;

function Header(props) {
  const { window, onShowCenters } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} className="drawer-content">
      <div className="drawer-header">
        <Typography variant="h6" className="drawer-logo">
          ReuseHub
        </Typography>
      </div>
      <Divider className="drawer-divider" />
      <List className="drawer-list">
        <ListItem disablePadding>
          <ListItemButton className="drawer-button" onClick={onShowCenters}>
            <ListItemText 
              primary="Show Centers" 
              className="drawer-text"
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Modern Header using CSS classes */}
      <AppBar position="static" className="modern-header">
        <Toolbar className="header-toolbar">
          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className="mobile-menu-btn"
          >
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography variant="h6" component="div" className="header-title">
            ReUseIt
          </Typography>

          {/* Right-side buttons */}
          <Box className="header-actions">
            <Button 
              onClick={onShowCenters} 
              className="header-btn"
            >
              Show Centers
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <nav>
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      {/* Adds spacing below AppBar */}
      <Box component="main">
        <Toolbar className="header-spacer" />
      </Box>
    </Box>
  );
}

Header.propTypes = {
  window: PropTypes.func,
  onShowCenters: PropTypes.func.isRequired,
};

export default Header;