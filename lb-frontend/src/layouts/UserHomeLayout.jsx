// src/layouts/UserHomeLayout.jsx
import React from 'react';
import UserNavbar from '../components/UserNavbar';

const UserHomeLayout = ({ userName, children }) => {
  return (
    <div>
      <UserNavbar userName={userName} />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default UserHomeLayout;