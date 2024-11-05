import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './SimplifiedTerms.scss';

const SimplifiedTerms: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'de' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const renderPoints = (key: string) => {
    const points = t(key, { returnObjects: true });
    if (Array.isArray(points)) {
      return points.map((point: string | object, index: number) => (
        <li key={index}>{typeof point === 'string' ? point : JSON.stringify(point)}</li>
      ));
    }
    return null;
  };

  return (
    <div className="simplified-terms-container">
      <div className="language-toggle">
        <button onClick={toggleLanguage} className="language-button">
          {language === 'en' ? 'Deutsch' : 'English'}
        </button>
      </div>

      <div className="terms-content">
        <h1>{t('Terms and Conditions')}</h1>
        <p>{t('Introduction p')}</p>

        <h2>{t('Core Concept')}</h2>
        <p>{t('About paragraph1')}</p>

        <h2>{t('trust.title')}</h2>
        <ul>
          {renderPoints('trust.points')}
        </ul>

        <h2>{t('honesty.title')}</h2>
        <ul>
          {renderPoints('honesty.points')}
        </ul>

        <div className="agreement">
          <p>{t('agreement')}</p>
        </div>

        <div className="privacy-note">
          <h2>{t('privacy.title')}</h2>
          <p>{t('privacy.content')}</p>
        </div>
      </div>

      <div className="back-link-container">
        <Link to="/register" className="back-link">
          {t('Go back')}
        </Link>
      </div>
    </div>
  );
};

export default SimplifiedTerms;