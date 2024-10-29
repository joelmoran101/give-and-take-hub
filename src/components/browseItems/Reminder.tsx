import React, { useState, useEffect, useContext } from 'react';
import './Reminder.scss'
import { AuthContext } from '../../context/auth/AuthContext';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

const Reminder = () => {
  const { t } = useTranslation(); // i18n hook to be added to all pages and components that need it to translate text contents which have to be previously defined as key value pairs on the i18n.js file
  const { loggedInUser} = useContext(AuthContext);

  const [showReminder, setShowReminder] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowReminder(false);
    }, 7000); // 7 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!showReminder) {
    return null;
  }

  if (loggedInUser) {
    return null;
  }

  return (
    <div className="reminder">
      <button
        type="button"
        className="close-button"
        onClick={() => setShowReminder(false)}
      >
        &#10005;
      </button>
      <p>{t('Reminder')}</p>
    </div>
  );
};

export default Reminder;