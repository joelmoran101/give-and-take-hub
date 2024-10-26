// src/auth/AuthContext.tsx
import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Logout.sass'
import { useTranslation } from 'react-i18next';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation(); // i18n hook to be added to all pages and components that need it to translate text contents which have to be previously defined as key value pairs on the i18n.js file

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className='logout-container'>
      {t('Logging out')}
      <button className='logout-button' onClick={handleLogout}>{t('Logout')}</button>
      <h2 className='logout-message'>{t('goodbye')}</h2>
    </div>
  );
};

export default Logout;