import { useEffect } from 'react';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, onClose]);
  return <div className={`message ${message.ok ? 'success' : 'error'}`}>{message.text}</div>;
};

export default Notification;

