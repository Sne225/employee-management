import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { FaHome, FaUsers, FaBell, FaChartBar, FaCog, FaBars, FaTimes, FaUserEdit, FaSignOutAlt } from 'react-icons/fa';
import Profile from './Profile';
import './Nav.css';

const navItems = [
  { label: 'Home', icon: <FaHome />, path: '/' },
  { label: 'Employees', icon: <FaUsers />, path: '/employees' },
  { label: 'Notifications', icon: <FaBell />, path: '/notifications' },
  { label: 'Reports', icon: <FaChartBar />, path: '/reports' },
  { label: 'Settings', icon: <FaCog />, path: '/settings' },
];

const SideNavigation = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScrollToElement = () => {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    handleScrollToElement();
  }, [location.hash]);

  const handleSignOut = () => {
                
    auth.signOut()
    .then(() => {
    navigation('Login');
                })
    .catch((error) => {
    console.error('Error logging out email client:', error);
                  });
  };

  return (
    <div>
      <AppBar position="fixed" className="app-bar">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSideNav}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </IconButton>
          <Profile email="employee@example.com" />
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={isOpen} onClose={toggleSideNav}>
        <div className="drawer-content">
          <List>
            {navItems.map((item) => (
              <ListItem
                key={item.label}
                button
                component={RouterLink}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
          <div className="profile-actions">
            <ListItem button component={RouterLink} to="/edit-profile">
              <ListItemIcon>
                <FaUserEdit />
              </ListItemIcon>
              <ListItemText primary="Edit Profile" />
            </ListItem>
            <ListItem button component={RouterLink} to="/settings">
              <ListItemIcon>
                <FaCog />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button component={RouterLink} to="/logout">
              <ListItemIcon>
                <FaSignOutAlt />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </div>
        </div>
      </Drawer>

      {/* Add content container to prevent content from being hidden behind the app bar */}
      <div className="content-container">{/* Your main content goes here */}</div>
    </div>
  );
};

export default SideNavigation;
