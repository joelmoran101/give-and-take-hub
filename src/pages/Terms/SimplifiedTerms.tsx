import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './SimplifiedTerms.scss';
import { Users, Heart, UserCheck, Shield, Lightbulb } from 'lucide-react';

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
        <h1 className="flex items-center">
          <Users className="icon h-8 w-8 text-secondary flex-shrink-0 mr-4" />
          <span>{t('Community based Terms and Conditions')}</span>
        </h1>
        <p>{t('Community based Terms p')}</p>

        <h2 className="flex items-center mt-6">
          <Heart className="icon h-8 w-8 text-info flex-shrink-0 mr-4" />
          <span>{t('trust.title')}</span>
        </h2>
        <ul>
          {renderPoints('trust.points')}
        </ul>

        <h2 className="flex items-center mt-6">
          <UserCheck className="icon h-8 w-8 text-success flex-shrink-0 mr-4" />
          <span>{t('honesty.title')}</span>
        </h2>
        <ul>
          {renderPoints('honesty.points')}
        </ul>

        <h2 className="flex items-center mt-6">
          <Lightbulb className="icon h-8 w-8 text-warning color-yellow-500 flex-shrink-0 mr-4" />
          <span>{t('Core Concept')}</span>
        </h2>

        <p>{t('About paragraph1')}</p>

        <div className="agreement mt-6">
          <p>{t('agreement')}</p>
        </div>

        <div className="privacy-note mt-6">
          <h2 className="flex items-center">
            <Shield className="icon h-8 w-8 text-primary flex-shrink-0 mr-4" />
            <span>{t('privacy.title')}</span>
          </h2>
          <p>{t('privacy.content')}</p>
        </div>
      </div>

      <div className="back-link-container mt-8">
        <Link to="/register" className="back-link">
          {t('Go back')}
        </Link>
      </div>
    </div>
  );
};

export default SimplifiedTerms;