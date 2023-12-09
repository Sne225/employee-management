// src/components/Profile.js
import React from 'react';
import Gravatar from './Gravatar';

const Profile = ({ email }) => {
  return (
    <div className="profile">
      <Gravatar email={email} />
      <span className="email">{email}</span>
    </div>
  );
};

export default Profile;
