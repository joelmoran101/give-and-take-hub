import React, { useState, useEffect, useContext } from 'react';
import './Reminder.scss'
import { AuthContext } from '../../context/auth/AuthContext';

const Reminder = () => {
  const { loggedInUser} = useContext(AuthContext);

  const [showReminder, setShowReminder] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowReminder(false);
    }, 5000); // 5 seconds
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
      <p>You have to join our community and login to interact with other members or post article/s.</p>
    </div>
  );
};

export default Reminder;