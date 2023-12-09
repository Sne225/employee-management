// src/components/SideNavigation.js
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Avatar,
    Divider,
    Typography,
} from '@mui/material';
import { FaHome, FaUsers, FaBell, FaChartBar, FaCog, FaBars, FaTimes, FaUserEdit, FaSignOutAlt, FaAdn, FaBacon, FaCodeBranch } from 'react-icons/fa';
import Profile from './Profile';
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../../firebase';
import logo from '../../assets/images/logo.webp';
import '../../App.css'



const navItems = [
    { label: 'Home', icon: <FaHome color='white'/>, path: '/home' },
    { label: 'Employees', icon: <FaUsers color='white'/>, path: '/list' },
    { label: 'Notifications', icon: <FaBell color='white'/>, path: '#' },
    { label: 'Reports', icon: <FaChartBar color='white'/>, path: '#' },
    { label: 'Employee Hierachy', icon: <FaCodeBranch color='white'/>, path: '#' },
];

const SideNavigation = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
    const [loading, setLoading] = useState(true);


    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged((authUser) => {
    //       setUser(authUser);
    //     });

    //     return () => unsubscribe();
    //   }, []);



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

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const handleSignOut = async () => {
        try {
          await auth.signOut();
          // Redirect to the home page after signing out
          navigate('/');
        } catch (error) {
          console.error('Error signing out:', error);
        }
      };
      


    return (
        <div>
            
            <AppBar position="fixed" className="app-bar">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSideNav}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </IconButton>
                    <Profile />
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={isOpen} onClose={toggleSideNav}>
                <div className="drawer-content">

                    <img src={logo} alt="Logo" className="logo" />

                    <Divider />
                    <List>
                        {navItems.map((item) => (
                            <ListItem
                                key={item.label}
                                button
                                component={RouterLink}
                                to={item.path}
                                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                <ListItemIcon className="icon">{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        <ListItem button component={RouterLink} to="#">
                            <ListItemIcon className="icon">
                                <FaUserEdit color='white'/>
                            </ListItemIcon>
                            <ListItemText primary="Edit Profile" />
                        </ListItem>
                        <ListItem button component={RouterLink} to="#">
                            <ListItemIcon className="icon">
                                <FaCog color='white'/>
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItem>
                        <ListItem button onClick={handleSignOut}>
                            <ListItemIcon className="icon">
                                <FaSignOutAlt color='white'/>
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>

            {/* Add content container to prevent content from being hidden behind the app bar */}
            <div className="content-container">
                <Typography variant="h4">.</Typography>
                {/* Your main content goes here */}
            </div>
        </div>
    );
};

export default SideNavigation;
