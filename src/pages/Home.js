
import React from 'react';
import SideNavigation from '../components/UI/SideNavigation';
import Profile from '../components/UI/Profile';

const Home = () => {
  // const userEmail = 'employee@example.com'; // Replace with actual email

  return (
    <div className="welcome-home">
       <SideNavigation />
      <div className="text-center">
       
        {/* <Profile email={userEmail} /> */}
        {/* Your main content goes here */}
        <h2>Welcome to the Employee System</h2>
        <p>This is your home interface.</p>
      </div>
    </div>
  );
};

export default Home;
