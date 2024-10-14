import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import './Hero.css';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { loggedInUser } = useContext(AuthContext);

  const { t } = useTranslation(); // i18n hook to be added to all pages and components that need it to translate text contents which have to be previously defined as key value pairs on the i18n.js file

  return (
    <div className="hero-container" aria-label='main hero'>
      <h1>{t('A Sharing Platform')}</h1>
      <p className="hero-description font" style={{ fontSize: '1.4rem' }}>
        <strong>{t('Core Concept')}</strong> 
          <p>
              {t('Hero paragraph1')} 
              <a href="https://gradido.net" target="_blank" rel="noopener noreferrer">{t('GraDiDo')}</a>. 
              {t('Hero paragraph2')}
          </p>
        <br/>
        <strong>{t('Hero paragraph3')}</strong>
      </p>
      <div className="hero-buttons">
        {!loggedInUser && (
          <>
            <Link to="/register"><button className="register-button">Register</button></Link>
            <Link to="/login"><button className="login-button">Login</button></Link>
          </>
        )}
        <Link to="/browse"><button className="browse-button">{t('Browse')}</button></Link>
      </div>
    </div>
  );
}

export default Hero;