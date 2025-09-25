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
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './header.css'; // Import the header-specific styles

const drawerWidth = 240;

function Header(props) {
  const { window } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleAboutClick = () => {
    navigate('/about');
    setMobileOpen(false);
  };

  const handleContactClick = () => {
    navigate('/contact');
    setMobileOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    setMobileOpen(false);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} className="drawer-content">
      <div className="drawer-header">
        <Typography variant="h6" className="drawer-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          ReUseIt
        </Typography>
      </div>
      <Divider className="drawer-divider" />
      <List className="drawer-list">
        <ListItem disablePadding>
          <ListItemButton className="drawer-button" onClick={handleAboutClick}>
            <ListItemText 
              primary="About" 
              className="drawer-text"
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton className="drawer-button" onClick={handleContactClick}>
            <ListItemText 
              primary="Contact" 
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
          <Typography 
            variant="h6" 
            component="div" 
            className="header-title"
            onClick={handleLogoClick}
            sx={{ cursor: 'pointer' }}
          >
            ReUseIt
          </Typography>

          {/* Right-side buttons */}
          <Box className="header-actions">
            <Button className="header-btn" onClick={handleAboutClick}>
              About
            </Button>
            <Button className="header-btn" onClick={handleContactClick}>
              Contact
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
};

export default Header;