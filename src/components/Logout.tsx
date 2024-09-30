// src/auth/AuthContext.tsx
import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className='logout-container'>
      Logging out...
      <button onClick={handleLogout}>Logout</button>
      <h2>Thank you for using our application. Goodbye!</h2>
    </div>
  );
};

export default Logout;