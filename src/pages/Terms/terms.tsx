// src/pages/Terms/terms.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { t } from 'i18next';
import './terms.scss';

const Terms: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="terms-container">
      <h1>{t('Terms and Conditions')}</h1>
      <h3>{t('Introduction')}</h3>
      <p>{t('Introduction p')}</p>
      <h3>{t('Definition')}</h3>
      <p>{t('App')}</p>
      <p>{t('User')}</p>
      <p>{t('Personal Data')}</p>
      <p>{t('GDPR')}</p>
      <h3>{t('Data Protection')}</h3>
      <p>{t('Data Protection p')}</p>
      <h5>{t('Data Collection')}</h5>
      <p>{t('Name and email')}</p>
      <p>{t('Location')}</p>
      <p>{t('Device information')}</p>
      <h5>{t('Data Use')}</h5>
      <p>{t('App services')}</p>
      <p>{t('User experience')}</p>
      <p>{t('compliance')}</p>
      <h5>{t('Data Sharing')}</h5>
      <h5>{t('Data Retention')}</h5>
      <h3>{t('4. User Rights')}</h3>
      <h5>{t('GDPR rights')}</h5>
      <p>{t('Right to access')}</p>
      <p>{t('Right to rectification')}</p>
      <p>{t('Right to deletion')}</p>
      <p>{t('Right to restriction')}</p>
      <p>{t('Right to object to data processing')}</p>
      <p>{t('Right to data portability')}</p>
      <h3>{t('5. Cookies and Tracking')}</h3>
      <p>{t('Cookies and Tracking p')}</p>
      <h3>{t('6. Security')}</h3>
      <p>{t('Security p')}</p>
      <h3>{t('7. Changes to Terms')}</h3>
      <p>{t('Changes to Terms p')}</p>
      <h3>{t('8. Governing Law')}</h3>
      <p>{t('Governing Law p')}</p>
      <h3>{t('9. Contact Us')}</h3>
      <p>{t('Contact Us p')}</p>
      {/* <p>{t('EU Representative')}</p> */}
      <h3>{t('10. Data Protection Officer')}</h3>
      <p>{t('Data Protection Officer p')}</p>
      <div className="back-link-container">
        <Link to="/register" className="back-link">
          {t('Back')}
        </Link>
      </div>
    </div>
  );
};

export default Terms;