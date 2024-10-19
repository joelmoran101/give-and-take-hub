import React, { useState, useEffect } from 'react';
import './Reminder.scss'

const Reminder = () => {
  const [showReminder, setShowReminder] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowReminder(false);
    }, 10000); // 10 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!showReminder) {
    return null;
  }

  return (
    <div className="reminder">
      <p>You have to join our community and login to interact with other members or post article/s.</p>
    </div>
  );
};

export default Reminder;